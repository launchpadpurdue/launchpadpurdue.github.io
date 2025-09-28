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
      console.log('Sync already in progress, skipping...');
      return { success: false, message: 'Sync already in progress' };
    }

    this.syncInProgress = true;
    
    try {
      console.log('Starting sync from Google Sheets...');
      
      // Fetch data from Google Sheets
      const sheetsData = await this.googleSheetsService.fetchLeaderboardData();
      console.log('Fetched data from Google Sheets:', sheetsData);

      if (!sheetsData || sheetsData.length === 0) {
        throw new Error('No data received from Google Sheets');
      }

      // Save current state to history before updating
      await this.saveCurrentStateToHistory();

      // Update teams in Firebase
      await this.updateTeamsFromSheetsData(sheetsData);

      this.lastSyncTime = new Date();
      console.log('Sync completed successfully at:', this.lastSyncTime);

      return { 
        success: true, 
        message: `Successfully synced ${sheetsData.length} teams`,
        timestamp: this.lastSyncTime,
        teamsCount: sheetsData.length
      };

    } catch (error) {
      console.error('Error during sync:', error);
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
      console.log('Saving current state to history...');
      
      // Get current teams
      const teamsCollection = collection(db, 'teams');
      const snapshot = await getDocs(query(teamsCollection, orderBy('totalScore', 'desc')));
      
      if (snapshot.empty) {
        console.log('No existing teams to save to history');
        return;
      }

      const timestamp = new Date().toISOString();
      const batch = writeBatch(db);
      const historyCollection = collection(db, 'rankingHistory');

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
      console.log('Current state saved to history');
      
    } catch (error) {
      console.error('Error saving current state to history:', error);
      throw error;
    }
  }

  // Update teams collection with data from Google Sheets
  async updateTeamsFromSheetsData(sheetsData) {
    try {
      console.log('Updating teams from sheets data...');
      
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
          console.log(`Updating team: ${sheetsTeam.teamName}`);
          
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
          console.log(`Creating new team: ${sheetsTeam.teamName}`);
        }
      }

      await batch.commit();
      console.log('Teams updated successfully');
      
    } catch (error) {
      console.error('Error updating teams from sheets data:', error);
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
      console.log(`Auto-sync triggered (every ${intervalMinutes} minutes)`);
      await this.syncFromGoogleSheets();
    }, intervalMinutes * 60 * 1000);

    console.log(`Auto-sync started: every ${intervalMinutes} minutes`);
  }

  // Stop auto-sync
  stopAutoSync() {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
      this.autoSyncInterval = null;
      console.log('Auto-sync stopped');
    }
  }

  // Manual sync trigger
  async triggerManualSync() {
    console.log('Manual sync triggered');
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