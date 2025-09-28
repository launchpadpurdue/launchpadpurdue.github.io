// Google Sheets API service for fetching leaderboard data
export class GoogleSheetsService {
  constructor() {
    this.spreadsheetId = '1L7Q5f_A8BQjg5PwVanglYtcqeaKPEvQMd3uKDe9I_l8';
    this.gid = '640329862';
    this.apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
    this.range = 'A:Z'; // Fetch all columns
  }

  // Fetch data from Google Sheets using the public CSV export URL
  async fetchLeaderboardData() {
    try {
      // Use the CSV export URL which doesn't require API key for public sheets
      const csvUrl = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv&gid=${this.gid}`;
      
      const response = await fetch(csvUrl);
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Google Sheets is not publicly accessible. Please make the sheet public or provide an API key.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      return this.parseCsvData(csvText);
    } catch (error) {
      // Fallback: try using the Google Sheets API if available
      if (this.apiKey) {
        return this.fetchUsingApi();
      }
      
      // If no API key and sheet is not public, provide helpful error
      if (error.message.includes('not publicly accessible')) {
        throw new Error('Google Sheets access failed. To fix this:\n1. Make the sheet publicly viewable, OR\n2. Set REACT_APP_GOOGLE_SHEETS_API_KEY environment variable with a valid API key');
      }
      
      throw error;
    }
  }

  // Fallback method using Google Sheets API
  async fetchUsingApi() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}?key=${this.apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Sheets API error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return this.parseApiData(data.values);
  }

  // Parse CSV data into structured format
  parseCsvData(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('Invalid CSV data: insufficient rows');
    }

    // Parse header row
    const headers = this.parseCsvRow(lines[0]);

    // Parse data rows and aggregate by team
    const teamMap = new Map();
    
    for (let i = 1; i < lines.length; i++) {
      const row = this.parseCsvRow(lines[i]);
      
      if (row.length > 0 && row[0] && row[0].trim()) {
        const rowData = this.parseRowData(headers, row);
        
        if (rowData && rowData.teamName) {
          const teamKey = rowData.teamName.toLowerCase().trim();
          
          if (!teamMap.has(teamKey)) {
            teamMap.set(teamKey, {
              teamName: rowData.teamName,
              eventAttendance: 0,
              projectProgress: 0,
              outsideEvents: 0,
              totalScore: 0
            });
          }
          
          const team = teamMap.get(teamKey);
          
          // Add points based on activity type
          if (rowData.activityType && rowData.pointValue > 0) {
            if (rowData.activityType.includes('lp meeting attendance') || 
                rowData.activityType.includes('meeting attendance')) {
              team.eventAttendance += rowData.pointValue;
            } else if (rowData.activityType.includes('external family hangout') ||
                       rowData.activityType.includes('family hangout') ||
                       rowData.activityType.includes('study together') ||
                       rowData.activityType.includes('boba run') ||
                       rowData.activityType.includes('lunch') ||
                       rowData.activityType.includes('sports')) {
              team.outsideEvents += rowData.pointValue;
            }
          }
          
          // Also add any direct column values
          if (rowData.eventAttendance) team.eventAttendance += rowData.eventAttendance;
          if (rowData.projectProgress) team.projectProgress += rowData.projectProgress;
          if (rowData.outsideEvents) team.outsideEvents += rowData.outsideEvents;
        }
      }
    }

    // Convert map to array and calculate total scores
    const teams = Array.from(teamMap.values()).map(team => {
      team.totalScore = team.eventAttendance + team.projectProgress + team.outsideEvents;
      return team;
    });

    return teams;
  }

  // Parse API response data
  parseApiData(values) {
    if (!values || values.length < 2) {
      throw new Error('Invalid API data: insufficient rows');
    }

    const headers = values[0];
    const teamMap = new Map();
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (row && row.length > 0 && row[0] && row[0].trim()) {
        const rowData = this.parseRowData(headers, row);
        if (rowData && rowData.teamName) {
          const teamKey = rowData.teamName.toLowerCase().trim();
          
          if (!teamMap.has(teamKey)) {
            teamMap.set(teamKey, {
              teamName: rowData.teamName,
              eventAttendance: 0,
              projectProgress: 0,
              outsideEvents: 0,
              totalScore: 0
            });
          }
          
          const team = teamMap.get(teamKey);
          
          // Add points based on activity type
          if (rowData.activityType && rowData.pointValue > 0) {
            if (rowData.activityType.includes('lp meeting attendance') || 
                rowData.activityType.includes('meeting attendance')) {
              team.eventAttendance += rowData.pointValue;
            } else if (rowData.activityType.includes('external family hangout') ||
                       rowData.activityType.includes('family hangout') ||
                       rowData.activityType.includes('study together') ||
                       rowData.activityType.includes('boba run') ||
                       rowData.activityType.includes('lunch') ||
                       rowData.activityType.includes('sports')) {
              team.outsideEvents += rowData.pointValue;
            }
          }
          
          // Also add any direct column values
          if (rowData.eventAttendance) team.eventAttendance += rowData.eventAttendance;
          if (rowData.projectProgress) team.projectProgress += rowData.projectProgress;
          if (rowData.outsideEvents) team.outsideEvents += rowData.outsideEvents;
        }
      }
    }

    // Convert map to array and calculate total scores
    const teams = Array.from(teamMap.values()).map(team => {
      team.totalScore = team.eventAttendance + team.projectProgress + team.outsideEvents;
      return team;
    });

    return teams;
  }

  // Parse a single CSV row, handling quoted values
  parseCsvRow(row) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  // Parse row data from headers and row
  parseRowData(headers, row) {
    const rowData = {};
    
    // Map headers to expected field names (case-insensitive)
    const fieldMapping = {
      'team': 'teamName',
      'team name': 'teamName',
      'teamname': 'teamName',
      'launchpad family name': 'teamName',
      'launchpadfamilyname': 'teamName',
      'family name': 'teamName',
      'familyname': 'teamName',
      'family': 'teamName',
      'event attendance': 'eventAttendance',
      'eventattendance': 'eventAttendance',
      'attendance': 'eventAttendance',
      'project progress': 'projectProgress',
      'projectprogress': 'projectProgress',
      'progress': 'projectProgress',
      'project': 'projectProgress',
      'outside events': 'outsideEvents',
      'outsideevents': 'outsideEvents',
      'outside': 'outsideEvents',
      'total': 'totalScore',
      'total score': 'totalScore',
      'totalscore': 'totalScore',
      'score': 'totalScore',
      'activity type': 'activityType',
      'activitytype': 'activityType',
      'activity': 'activityType',
      'point value': 'pointValue',
      'pointvalue': 'pointValue',
      'points': 'pointValue',
      'value': 'pointValue'
    };

    let teamNameFound = false;
    
    // Process each column
    for (let j = 0; j < headers.length && j < row.length; j++) {
      const header = headers[j].toLowerCase().trim();
      const value = row[j] ? row[j].toString().trim() : '';
      
      // Map header to field name
      const fieldName = fieldMapping[header] || header;
      
      // Don't skip LaunchPad Family Name - that's our team name!
      // Only skip columns that are actually LaunchPad Events
      if (header.includes('launchpad event') || header.includes('launch pad event')) {
        continue;
      }
      
      if (fieldName === 'teamName' && value) {
        rowData.teamName = value;
        teamNameFound = true;
      } else if (fieldName === 'activityType' && value) {
        rowData.activityType = value.toLowerCase();
      } else if (fieldName === 'pointValue' && value) {
        rowData.pointValue = this.parseNumericValue(value);
      } else if (['eventAttendance', 'projectProgress', 'outsideEvents', 'totalScore'].includes(fieldName)) {
        // Parse numeric values
        const numValue = this.parseNumericValue(value);
        rowData[fieldName] = numValue;
      } else if (value) {
        // Store other fields as-is
        rowData[fieldName] = value;
      }
    }

    // Only return row data if it has a team name
    if (!teamNameFound || !rowData.teamName) {
      return null;
    }

    return rowData;
  }

  // Parse numeric value from string
  parseNumericValue(value) {
    if (!value || value === '') return 0;
    
    // Remove any non-numeric characters except decimal point and negative sign
    const cleaned = value.toString().replace(/[^\d.-]/g, '');
    const parsed = parseFloat(cleaned);
    
    return isNaN(parsed) ? 0 : parsed;
  }

  // Check if the service is properly configured
  isConfigured() {
    return this.spreadsheetId && this.gid;
  }
}

export default GoogleSheetsService;