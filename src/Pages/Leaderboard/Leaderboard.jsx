import React, { useState, useEffect } from "react";
import "./leaderboard.css";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SyncIcon from '@mui/icons-material/Sync';
import { db } from '../../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DataSyncService from '../../services/dataSyncService';

export default function Leaderboard() {
  document.title = "Leaderboard - LaunchPad";

  const [teams, setTeams] = useState([]);
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [pendingUpdates, setPendingUpdates] = useState([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAddTeamForm, setShowAddTeamForm] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [rankingHistory, setRankingHistory] = useState([]);
  const [showChart, setShowChart] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedChartType, setSelectedChartType] = useState('ranking');
  const [submissionForm, setSubmissionForm] = useState({
    teamName: '',
    eventAttendance: 0,
    projectProgress: 0,
    outsideEvents: 0,
    notes: ''
  });
  const [dataSyncService] = useState(() => new DataSyncService());
  const [syncStatus] = useState({ isConfigured: false, lastSyncTime: null, syncInProgress: false });
  const [syncMessage, setSyncMessage] = useState('');
  const [selectedTeamCurrentScores, setSelectedTeamCurrentScores] = useState(null);
  const [newTeamForm, setNewTeamForm] = useState({
    teamName: '',
    description: ''
  });

  useEffect(() => {
    const teamsCollection = collection(db, 'teams');
    const q = query(teamsCollection, orderBy('totalScore', 'desc'));

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const teamsData = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          ...doc.data(),
          ranking: index + 1
        }));

        teamsData.forEach((team, index) => {
          const previousRanking = team.previousRanking || index + 1;
          team.rankingChange = previousRanking - (index + 1);
        });

        setTeams(teamsData);
      },
      (error) => {
        console.error('Error fetching teams:', error);
      });

    // Load ranking history
    const historyCollection = collection(db, 'rankingHistory');
    const historyQuery = query(historyCollection, orderBy('timestamp', 'desc'));

    const historyUnsubscribe = onSnapshot(historyQuery,
      (snapshot) => {
        const historyData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));


      // Transform history data for the chart
      // Get all unique dates (no limit) and sort chronologically
      const uniqueDates = [...new Set(historyData.map(h => h.timestamp))].sort((a, b) => new Date(a) - new Date(b));

      if (uniqueDates.length === 0) {
        setRankingHistory([]);
        setFilteredHistory([]);
        return;
      }

      // Create chart data for all historical points
      const chartData = uniqueDates.map(timestamp => {
        const dataPoint = {
          timestamp: timestamp,
          date: new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          fullDate: new Date(timestamp)
        };

        // Find data for this timestamp
        const dataAtTime = historyData.filter(h => h.timestamp === timestamp);
        dataAtTime.forEach(entry => {
          if (entry.teamName) {
            // Store all metrics for each team
            dataPoint[`${entry.teamName}_ranking`] = entry.ranking;
            dataPoint[`${entry.teamName}_totalScore`] = entry.totalScore || 0;
            dataPoint[`${entry.teamName}_eventAttendance`] = entry.eventAttendance || 0;
            dataPoint[`${entry.teamName}_projectProgress`] = entry.projectProgress || 0;
            dataPoint[`${entry.teamName}_outsideEvents`] = entry.outsideEvents || 0;
          }
        });

        return dataPoint;
      });

      setRankingHistory(chartData);
      setFilteredHistory(chartData);
    },
    (error) => {
      console.error('Error fetching ranking history:', error);
    });

    const pendingCollection = collection(db, 'pendingUpdates');
    const pendingUnsubscribe = onSnapshot(pendingCollection,
      (snapshot) => {
        const pendingData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPendingUpdates(pendingData);
      },
      (error) => {
        console.error('Error fetching pending updates:', error);
      });

    const registeredTeamsCollection = collection(db, 'registeredTeams');
    const registeredTeamsUnsubscribe = onSnapshot(registeredTeamsCollection,
      (snapshot) => {
        const registeredTeamsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRegisteredTeams(registeredTeamsData);
      },
      (error) => {
        console.error('Error fetching registered teams:', error);
      });

    return () => {
      unsubscribe();
      historyUnsubscribe();
      pendingUnsubscribe();
      registeredTeamsUnsubscribe();
    };
  }, []);

  // Filter history based on selected timeframe
  useEffect(() => {
    if (rankingHistory.length === 0) {
      setFilteredHistory([]);
      return;
    }

    const now = new Date();
    let filteredData = rankingHistory;

    switch (selectedTimeframe) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filteredData = rankingHistory.filter(entry => entry.fullDate >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filteredData = rankingHistory.filter(entry => entry.fullDate >= monthAgo);
        break;
      case 'recent':
        // Show last 20 entries for performance
        filteredData = rankingHistory.slice(-20);
        break;
      case 'all':
      default:
        filteredData = rankingHistory;
        break;
    }

    setFilteredHistory(filteredData);
  }, [rankingHistory, selectedTimeframe]);

  const calculateTotalScore = (team) => {
    return (team.eventAttendance || 0) +
           (team.projectProgress || 0) +
           (team.outsideEvents || 0);
  };

  const handleTeamSelection = (teamName) => {
    setSubmissionForm({...submissionForm, teamName});

    if (teamName) {
      // Find the current scores for the selected team
      const existingTeam = teams.find(t => t.teamName === teamName);
      setSelectedTeamCurrentScores(existingTeam ? {
        eventAttendance: existingTeam.eventAttendance || 0,
        projectProgress: existingTeam.projectProgress || 0,
        outsideEvents: existingTeam.outsideEvents || 0,
        totalScore: existingTeam.totalScore || 0
      } : {
        eventAttendance: 0,
        projectProgress: 0,
        outsideEvents: 0,
        totalScore: 0
      });
    } else {
      setSelectedTeamCurrentScores(null);
    }
  };

  const handleAddNewTeam = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (!newTeamForm.teamName.trim()) {
      alert('Please enter a team name.');
      return;
    }

    try {
      const existingTeam = registeredTeams.find(t =>
        t.teamName.toLowerCase() === newTeamForm.teamName.trim().toLowerCase()
      );

      if (existingTeam) {
        alert('A team with this name already exists.');
        return;
      }

      await addDoc(collection(db, 'registeredTeams'), {
        teamName: newTeamForm.teamName.trim(),
        description: newTeamForm.description.trim(),
        createdAt: new Date().toISOString()
      });

      setNewTeamForm({
        teamName: '',
        description: ''
      });
      setShowAddTeamForm(false);
      alert('New team added successfully!');
    } catch (error) {
      console.error('Error adding team:', error);
      alert(`Failed to add team: ${error.message}`);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    if (!submissionForm.teamName) {
      alert('Please select a team.');
      return;
    }

    const selectedTeam = registeredTeams.find(t => t.teamName === submissionForm.teamName);
    if (!selectedTeam) {
      alert('Selected team is not valid. Please select from the dropdown.');
      return;
    }

    try {
      // Calculate new scores by adding points to current scores
      const currentScores = selectedTeamCurrentScores || {
        eventAttendance: 0,
        projectProgress: 0,
        outsideEvents: 0
      };

      const newScores = {
        eventAttendance: currentScores.eventAttendance + (submissionForm.eventAttendance || 0),
        projectProgress: currentScores.projectProgress + (submissionForm.projectProgress || 0),
        outsideEvents: currentScores.outsideEvents + (submissionForm.outsideEvents || 0)
      };

      const newUpdate = {
        teamName: submissionForm.teamName,
        eventAttendance: newScores.eventAttendance,
        projectProgress: newScores.projectProgress,
        outsideEvents: newScores.outsideEvents,
        totalScore: calculateTotalScore(newScores),
        pointsAdded: {
          eventAttendance: submissionForm.eventAttendance || 0,
          projectProgress: submissionForm.projectProgress || 0,
          outsideEvents: submissionForm.outsideEvents || 0
        },
        notes: submissionForm.notes,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      console.log('Submitting update:', newUpdate);
      await addDoc(collection(db, 'pendingUpdates'), newUpdate);

      setSubmissionForm({
        teamName: '',
        eventAttendance: 0,
        projectProgress: 0,
        outsideEvents: 0,
        notes: ''
      });
      setShowSubmitForm(false);
      alert('Score update submitted for review!');
    } catch (error) {
      console.error('Error submitting update:', error);
      alert(`Failed to submit update: ${error.message}`);
    }
  };

  const saveRankingSnapshot = async () => {
    // Save current rankings and scores to history
    const timestamp = new Date().toISOString();
    const batch = [];

    for (const team of teams) {
      batch.push(
        addDoc(collection(db, 'rankingHistory'), {
          teamName: team.teamName,
          ranking: team.ranking,
          totalScore: team.totalScore,
          eventAttendance: team.eventAttendance || 0,
          projectProgress: team.projectProgress || 0,
          outsideEvents: team.outsideEvents || 0,
          timestamp: timestamp
        })
      );
    }

    await Promise.all(batch);
  };

  const handleApproveUpdate = async (update) => {
    if (!isAdmin) return;

    try {
      // Save current rankings before making changes
      await saveRankingSnapshot();

      const existingTeam = teams.find(t => t.teamName === update.teamName);

      if (existingTeam) {
        const teamRef = doc(db, 'teams', existingTeam.id);
        const previousScores = {
          eventAttendance: existingTeam.eventAttendance || 0,
          projectProgress: existingTeam.projectProgress || 0,
          outsideEvents: existingTeam.outsideEvents || 0
        };

        const newScores = {
          eventAttendance: update.eventAttendance,
          projectProgress: update.projectProgress,
          outsideEvents: update.outsideEvents,
          totalScore: calculateTotalScore(update),
          previousRanking: existingTeam.ranking,
          previousScores: previousScores,
          lastUpdated: new Date().toISOString()
        };

        console.log('Updating team:', update.teamName, 'with scores:', newScores);
        await updateDoc(teamRef, newScores);
      } else {
        const newTeamData = {
          teamName: update.teamName,
          eventAttendance: update.eventAttendance,
          projectProgress: update.projectProgress,
          outsideEvents: update.outsideEvents,
          totalScore: calculateTotalScore(update),
          previousRanking: teams.length + 1,
          previousScores: {
            eventAttendance: 0,
            projectProgress: 0,
            outsideEvents: 0
          },
          lastUpdated: new Date().toISOString()
        };

        console.log('Creating new team:', update.teamName, 'with data:', newTeamData);
        await addDoc(collection(db, 'teams'), newTeamData);
      }

      console.log('Deleting pending update:', update.id);
      await deleteDoc(doc(db, 'pendingUpdates', update.id));
      alert('Update approved and applied successfully!');
    } catch (error) {
      console.error('Error approving update:', error);
      alert(`Failed to approve update: ${error.message}`);
    }
  };

  const handleRejectUpdate = async (updateId) => {
    if (!isAdmin) return;

    try {
      await deleteDoc(doc(db, 'pendingUpdates', updateId));
      alert('Update rejected!');
    } catch (error) {
      console.error('Error rejecting update:', error);
      alert('Failed to reject update.');
    }
  };

  const handleEditTeam = async (team) => {
    if (!isAdmin) return;

    if (editingTeam === team.id) {
      try {
        // Save current rankings before making changes
        await saveRankingSnapshot();

        const teamRef = doc(db, 'teams', team.id);
        await updateDoc(teamRef, {
          eventAttendance: team.eventAttendance,
          projectProgress: team.projectProgress,
          outsideEvents: team.outsideEvents,
          totalScore: calculateTotalScore(team),
          lastUpdated: new Date().toISOString()
        });
        setEditingTeam(null);
        alert('Team updated successfully!');
      } catch (error) {
        console.error('Error updating team:', error);
        alert('Failed to update team.');
      }
    } else {
      setEditingTeam(team.id);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'launchpad2025admin';
    if (adminPassword === correctPassword) {
      setIsAdmin(true);
      setShowAdminPanel(false);
      setAdminPassword('');
      alert('Admin access granted!');
    } else {
      alert('Incorrect password!');
    }
  };

  const getRankingIcon = (change) => {
    if (change > 0) return <ArrowUpwardIcon className="ranking-up" />;
    if (change < 0) return <ArrowDownwardIcon className="ranking-down" />;
    return <RemoveIcon className="ranking-same" />;
  };


  const getChartTitle = (chartType) => {
    switch (chartType) {
      case 'ranking': return 'Rankings';
      case 'totalScore': return 'Total Score';
      case 'eventAttendance': return 'Event Attendance';
      case 'projectProgress': return 'Project Progress';
      case 'outsideEvents': return 'Outside Events';
      default: return 'Rankings';
    }
  };

  const getYAxisLabel = (chartType) => {
    switch (chartType) {
      case 'ranking': return 'Ranking Position';
      case 'totalScore': return 'Total Score Points';
      case 'eventAttendance': return 'Event Attendance Points';
      case 'projectProgress': return 'Project Progress Points';
      case 'outsideEvents': return 'Outside Events Points';
      default: return 'Ranking Position';
    }
  };

  return (
    <div className="leaderboard pageContainer">
      <h1 className="header">Team Leaderboard</h1>
      <h5 className="subheader">
        Track your team's progress and compete with other groups!
      </h5>

      {/* Ranking Changes Chart */}
      {teams.length > 0 && rankingHistory.length > 0 && (
        <div className="ranking-chart-container">
          <div className="chart-header">
            <h3>Team Analytics Over Time</h3>
            <div className="chart-controls">
              <select
                value={selectedChartType}
                onChange={(e) => setSelectedChartType(e.target.value)}
                className="chart-type-selector"
              >
                <option value="ranking">Rankings</option>
                <option value="totalScore">Total Score</option>
                <option value="eventAttendance">Event Attendance</option>
                <option value="projectProgress">Project Progress</option>
                <option value="outsideEvents">Outside Events</option>
              </select>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="timeframe-selector"
              >
                <option value="all">All Time</option>
                <option value="month">Last 30 Days</option>
                <option value="week">Last 7 Days</option>
                <option value="recent">Recent Updates (Last 20)</option>
              </select>
              <button
                className="toggle-chart-btn"
                onClick={() => setShowChart(!showChart)}
              >
                {showChart ? 'Hide Chart' : 'Show Chart'}
              </button>
            </div>
          </div>
          {showChart && (
            <div className="chart-info">
              <p>Showing {filteredHistory.length} snapshots | Chart: {getChartTitle(selectedChartType)} | Displaying top 5 teams</p>
            </div>
          )}
          {showChart && (
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                data={filteredHistory}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 80,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  height={120}
                  interval={filteredHistory.length > 50 ? Math.floor(filteredHistory.length / 20) : 0}
                />
                <YAxis
                  reversed={selectedChartType === 'ranking'}
                  domain={selectedChartType === 'ranking' ? [1, 'dataMax'] : ['dataMin', 'dataMax']}
                  label={{ value: getYAxisLabel(selectedChartType), angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  labelFormatter={(value, payload) => {
                    if (payload && payload[0] && payload[0].payload) {
                      const fullDate = new Date(payload[0].payload.timestamp);
                      return fullDate.toLocaleString();
                    }
                    return value;
                  }}
                />
                <Legend />
                {teams.slice(0, 5).map((team, index) => (
                  <Line
                    key={team.id}
                    type="monotone"
                    dataKey={`${team.teamName}_${selectedChartType}`}
                    stroke={`hsl(${index * 72}, 70%, 50%)`}
                    strokeWidth={2}
                    dot={filteredHistory.length <= 50 ? { r: 4 } : false}
                    activeDot={{ r: 6 }}
                    connectNulls
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {/* Sync Status and Manual Sync */}
      <div className="sync-status-container">
        <div className="sync-status">
          <span className="sync-label">Data Source: Google Sheets</span>
          {syncMessage && <span className="sync-message">{syncMessage}</span>}
          <span className="last-sync">Last sync: {dataSyncService.getLastSyncInfo().formattedLastSync}</span>
        </div>
        {isAdmin && (
          <button
            className="sync-btn"
            onClick={async () => {
              setSyncMessage('🔄 Syncing from Google Sheets...');
              const result = await dataSyncService.triggerManualSync();
              if (result.success) {
                setSyncMessage(`✓ Sync completed: ${result.teamsCount} teams updated`);
              } else {
                setSyncMessage(`✗ Sync failed: ${result.message}`);
              }
            }}
            disabled={syncStatus.syncInProgress}
          >
            <SyncIcon /> {syncStatus.syncInProgress ? 'Syncing...' : 'Sync Now'}
          </button>
        )}
      </div>

      <div className="leaderboard-actions">
        <button
          className="submit-score-btn"
          onClick={() => setShowSubmitForm(!showSubmitForm)}
        >
          Submit Score Update
        </button>
        {!isAdmin && (
          <button
            className="admin-login-btn"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
          >
            Admin Access
          </button>
        )}
        {isAdmin && (
          <>
            <button
              className="add-team-btn"
              onClick={() => setShowAddTeamForm(!showAddTeamForm)}
            >
              Add New Team
            </button>
            <button
              className="admin-logout-btn"
              onClick={() => setIsAdmin(false)}
            >
              Logout Admin
            </button>
          </>
        )}
      </div>

      {showAdminPanel && !isAdmin && (
        <div className="admin-panel">
          <form onSubmit={handleAdminLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <button type="button" onClick={() => setShowAdminPanel(false)}>Cancel</button>
          </form>
        </div>
      )}

      {isAdmin && showAddTeamForm && (
        <div className="add-team-form-container">
          <h3>Add New Team</h3>
          <form onSubmit={handleAddNewTeam}>
            <input
              type="text"
              placeholder="Team Name"
              value={newTeamForm.teamName}
              onChange={(e) => setNewTeamForm({...newTeamForm, teamName: e.target.value})}
              required
            />
            <textarea
              placeholder="Team Description (optional)"
              value={newTeamForm.description}
              onChange={(e) => setNewTeamForm({...newTeamForm, description: e.target.value})}
            />
            <div className="form-actions">
              <button type="submit">Add Team</button>
              <button type="button" onClick={() => setShowAddTeamForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {showSubmitForm && (
        <div className="submit-form-container">
          <h3>Submit Score Update</h3>
          <form onSubmit={handleSubmitUpdate}>
            <select
              value={submissionForm.teamName}
              onChange={(e) => handleTeamSelection(e.target.value)}
              required
            >
              <option value="">Select a team...</option>
              {registeredTeams.map(team => (
                <option key={team.id} value={team.teamName}>
                  {team.teamName}
                </option>
              ))}
            </select>

            {selectedTeamCurrentScores && (
              <div className="current-scores-display">
                <h4>Current Scores for {submissionForm.teamName}</h4>
                <div className="current-scores-grid">
                  <div>Event Attendance: <strong>{selectedTeamCurrentScores.eventAttendance}</strong></div>
                  <div>Project Progress: <strong>{selectedTeamCurrentScores.projectProgress}</strong></div>
                  <div>Outside Events: <strong>{selectedTeamCurrentScores.outsideEvents}</strong></div>
                  <div className="total-score">Total Score: <strong>{selectedTeamCurrentScores.totalScore}</strong></div>
                </div>
              </div>
            )}

            {submissionForm.teamName && (
              <div className="score-inputs">
                <label>
                  Add Event Attendance Points:
                  <input
                    type="number"
                    min="0"
                    value={submissionForm.eventAttendance}
                    onChange={(e) => setSubmissionForm({...submissionForm, eventAttendance: parseInt(e.target.value) || 0})}
                    placeholder="Points to add..."
                  />
                </label>
                <label>
                  Add Project Progress Points:
                  <input
                    type="number"
                    min="0"
                    value={submissionForm.projectProgress}
                    onChange={(e) => setSubmissionForm({...submissionForm, projectProgress: parseInt(e.target.value) || 0})}
                    placeholder="Points to add..."
                  />
                </label>
                <label>
                  Add Outside Event Points:
                  <input
                    type="number"
                    min="0"
                    value={submissionForm.outsideEvents}
                    onChange={(e) => setSubmissionForm({...submissionForm, outsideEvents: parseInt(e.target.value) || 0})}
                    placeholder="Points to add..."
                  />
                </label>
              </div>
            )}
            <textarea
              placeholder="Notes (optional)"
              value={submissionForm.notes}
              onChange={(e) => setSubmissionForm({...submissionForm, notes: e.target.value})}
            />
            <div className="form-actions">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowSubmitForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {isAdmin && pendingUpdates.length > 0 && (
        <div className="pending-updates">
          <h3>Pending Updates</h3>
          {pendingUpdates.map(update => (
            <div key={update.id} className="pending-update-item">
              <div className="update-info">
                <strong>{update.teamName}</strong>
                {update.pointsAdded ? (
                  <span>Adding - EA: +{update.pointsAdded.eventAttendance} | PP: +{update.pointsAdded.projectProgress} | OE: +{update.pointsAdded.outsideEvents}</span>
                ) : (
                  <span>New totals - EA: {update.eventAttendance} | PP: {update.projectProgress} | OE: {update.outsideEvents}</span>
                )}
                {update.notes && <p>Notes: {update.notes}</p>}
              </div>
              <div className="update-actions">
                <button onClick={() => handleApproveUpdate(update)} className="approve-btn">
                  <CheckIcon /> Approve
                </button>
                <button onClick={() => handleRejectUpdate(update.id)} className="reject-btn">
                  <CloseIcon /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Ranking</th>
              <th><ArrowUpwardIcon fontSize="small" /><ArrowDownwardIcon fontSize="small" /></th>
              <th>Team Name</th>
              <th>Event Attendance</th>
              <th>Project Progress</th>
              <th>Outside Events</th>
              <th>Total Score</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id} className={editingTeam === team.id ? 'editing' : ''}>
                <td className="ranking-cell">{team.ranking}</td>
                <td className="change-cell">{getRankingIcon(team.rankingChange)}</td>
                <td className="team-name-cell">{team.teamName}</td>
                <td>
                  {editingTeam === team.id ? (
                    <input
                      type="number"
                      value={team.eventAttendance}
                      onChange={(e) => {
                        const newTeams = [...teams];
                        const index = newTeams.findIndex(t => t.id === team.id);
                        newTeams[index].eventAttendance = parseInt(e.target.value) || 0;
                        setTeams(newTeams);
                      }}
                    />
                  ) : team.eventAttendance}
                </td>
                <td>
                  {editingTeam === team.id ? (
                    <input
                      type="number"
                      value={team.projectProgress}
                      onChange={(e) => {
                        const newTeams = [...teams];
                        const index = newTeams.findIndex(t => t.id === team.id);
                        newTeams[index].projectProgress = parseInt(e.target.value) || 0;
                        setTeams(newTeams);
                      }}
                    />
                  ) : team.projectProgress}
                </td>
                <td>
                  {editingTeam === team.id ? (
                    <input
                      type="number"
                      value={team.outsideEvents}
                      onChange={(e) => {
                        const newTeams = [...teams];
                        const index = newTeams.findIndex(t => t.id === team.id);
                        newTeams[index].outsideEvents = parseInt(e.target.value) || 0;
                        setTeams(newTeams);
                      }}
                    />
                  ) : team.outsideEvents}
                </td>
                <td className="total-score-cell">{team.totalScore}</td>
                {isAdmin && (
                  <td>
                    <button onClick={() => handleEditTeam(team)} className="edit-btn">
                      {editingTeam === team.id ? <CheckIcon /> : <EditIcon />}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}