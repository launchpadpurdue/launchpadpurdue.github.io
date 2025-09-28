import { collection, doc, query, orderBy, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config';
import GoogleSheetsService from './googleSheetsService';

export class DataSyncService {
  constructor() {
    this.googleSheetsService = new GoogleSheetsService();
    this.lastSyncTime = null;
    this.syncInProgress = false;
  }

  // Sync data from Google Sheets to Firebase
  async syncFromGoogleSheets() {
    if (this.syncInProgress) {
      return { success: false, message: 'Sync already in progress' };
    }

    this.syncInProgress = true;
    
    try {
      // Fetch data from Google Sheets
      const sheetsData = await this.googleSheetsService.fetchLeaderboardData();

      if (!sheetsData || sheetsData.length === 0) {
        return { 
          success: true, 
          message: 'Sync completed but no teams found in sheet',
          timestamp: new Date(),
          teamsCount: 0
        };
      }

      // Save current state to history before updating
      await this.saveCurrentStateToHistory();

      // Update teams in Firebase
      await this.updateTeamsFromSheetsData(sheetsData);

      this.lastSyncTime = new Date();

      return { 
        success: true, 
        message: `Successfully synced ${sheetsData.length} teams`,
        timestamp: this.lastSyncTime,
        teamsCount: sheetsData.length
      };

    } catch (error) {
      return { 
        success: false, 
        message: `Sync failed: ${error.message}`,
        error: error
      };
    } finally {
      this.syncInProgress = false;
    }
  }

  // Save current teams state to ranking history
  async saveCurrentStateToHistory() {
    try {
      
      // Get current teams
      const teamsCollection = collection(db, 'teams');
      const snapshot = await getDocs(query(teamsCollection, orderBy('totalScore', 'desc')));
      
      if (snapshot.empty) {
        return;
      }

      // Check if we need to save history by comparing with latest entry
      const historyCollection = collection(db, 'rankingHistory');
      const latestHistoryQuery = query(historyCollection, orderBy('timestamp', 'desc'));
      const latestHistorySnapshot = await getDocs(latestHistoryQuery);
      
      // Build current state for comparison
      const currentState = {};
      snapshot.docs.forEach((teamDoc, index) => {
        const team = teamDoc.data();
        currentState[team.teamName] = {
          ranking: index + 1,
          totalScore: team.totalScore || 0,
          eventAttendance: team.eventAttendance || 0,
          projectProgress: team.projectProgress || 0,
          outsideEvents: team.outsideEvents || 0
        };
      });

      // If we have previous history, check if anything changed
      if (!latestHistorySnapshot.empty) {
        const latestTimestamp = latestHistorySnapshot.docs[0].data().timestamp;
        const latestHistoryByTeam = {};
        
        // Group latest history by team name
        latestHistorySnapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data.timestamp === latestTimestamp) {
            latestHistoryByTeam[data.teamName] = {
              ranking: data.ranking,
              totalScore: data.totalScore || 0,
              eventAttendance: data.eventAttendance || 0,
              projectProgress: data.projectProgress || 0,
              outsideEvents: data.outsideEvents || 0
            };
          }
        });

        // Compare current state with latest history
        let hasChanges = false;
        
        // Check if any teams have changed
        for (const teamName in currentState) {
          const current = currentState[teamName];
          const previous = latestHistoryByTeam[teamName];
          
          if (!previous || 
              current.ranking !== previous.ranking ||
              current.totalScore !== previous.totalScore ||
              current.eventAttendance !== previous.eventAttendance ||
              current.projectProgress !== previous.projectProgress ||
              current.outsideEvents !== previous.outsideEvents) {
            hasChanges = true;
            break;
          }
        }
        
        // Check if teams were added or removed
        if (!hasChanges && Object.keys(currentState).length !== Object.keys(latestHistoryByTeam).length) {
          hasChanges = true;
        }
        
        // If no changes, skip saving
        if (!hasChanges) {
          return;
        }
      }

      const timestamp = new Date().toISOString();
      const batch = writeBatch(db);

      snapshot.docs.forEach((teamDoc, index) => {
        const team = teamDoc.data();
        const historyRef = doc(historyCollection);
        
        batch.set(historyRef, {
          teamName: team.teamName,
          ranking: index + 1,
          totalScore: team.totalScore || 0,
          eventAttendance: team.eventAttendance || 0,
          projectProgress: team.projectProgress || 0,
          outsideEvents: team.outsideEvents || 0,
          timestamp: timestamp,
          syncSource: 'google_sheets'
        });
      });

      await batch.commit();
      
    } catch (error) {
      throw error;
    }
  }

  // Update teams collection with data from Google Sheets
  async updateTeamsFromSheetsData(sheetsData) {
    try {
      
      // Get existing teams
      const teamsCollection = collection(db, 'teams');
      const existingSnapshot = await getDocs(teamsCollection);
      const existingTeams = new Map();
      
      existingSnapshot.docs.forEach(doc => {
        const team = doc.data();
        existingTeams.set(team.teamName.toLowerCase(), { id: doc.id, ...team });
      });

      const batch = writeBatch(db);
      const timestamp = new Date().toISOString();

      // Process each team from sheets
      for (const sheetsTeam of sheetsData) {
        const teamKey = sheetsTeam.teamName.toLowerCase();
        const existingTeam = existingTeams.get(teamKey);

        if (existingTeam) {
          // Update existing team
          const teamRef = doc(db, 'teams', existingTeam.id);
          
          const updateData = {
            eventAttendance: sheetsTeam.eventAttendance || 0,
            projectProgress: sheetsTeam.projectProgress || 0,
            outsideEvents: sheetsTeam.outsideEvents || 0,
            totalScore: sheetsTeam.totalScore || 0,
            lastUpdated: timestamp,
            syncSource: 'google_sheets',
            previousRanking: existingTeam.ranking || 1,
            previousScores: {
              eventAttendance: existingTeam.eventAttendance || 0,
              projectProgress: existingTeam.projectProgress || 0,
              outsideEvents: existingTeam.outsideEvents || 0,
              totalScore: existingTeam.totalScore || 0
            }
          };

          batch.update(teamRef, updateData);
          
        } else {
          // Create new team
          const newTeamRef = doc(teamsCollection);
          
          const newTeamData = {
            teamName: sheetsTeam.teamName,
            eventAttendance: sheetsTeam.eventAttendance || 0,
            projectProgress: sheetsTeam.projectProgress || 0,
            outsideEvents: sheetsTeam.outsideEvents || 0,
            totalScore: sheetsTeam.totalScore || 0,
            lastUpdated: timestamp,
            syncSource: 'google_sheets',
            previousRanking: 999,
            previousScores: {
              eventAttendance: 0,
              projectProgress: 0,
              outsideEvents: 0,
              totalScore: 0
            }
          };

          batch.set(newTeamRef, newTeamData);
        }
      }

      await batch.commit();
      
    } catch (error) {
      throw error;
    }
  }

  // Get sync status
  getSyncStatus() {
    return {
      isConfigured: this.googleSheetsService.isConfigured(),
      lastSyncTime: this.lastSyncTime,
      syncInProgress: this.syncInProgress
    };
  }

  // Auto-sync at regular intervals
  startAutoSync(intervalMinutes = 15) {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
    }

    this.autoSyncInterval = setInterval(async () => {
      await this.syncFromGoogleSheets();
    }, intervalMinutes * 60 * 1000);
  }

  // Stop auto-sync
  stopAutoSync() {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
      this.autoSyncInterval = null;
    }
  }

  // Manual sync trigger
  async triggerManualSync() {
    return await this.syncFromGoogleSheets();
  }

  // Get last sync information
  getLastSyncInfo() {
    return {
      lastSyncTime: this.lastSyncTime,
      syncInProgress: this.syncInProgress,
      formattedLastSync: this.lastSyncTime ? 
        this.lastSyncTime.toLocaleString() : 'Never'
    };
  }
}

export default DataSyncService;