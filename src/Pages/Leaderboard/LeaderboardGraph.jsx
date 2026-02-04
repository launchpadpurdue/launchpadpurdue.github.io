import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  ReferenceLine
} from 'recharts';

const TEAM_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#F1948A', '#85C1E9', '#D2B4DE',
  '#F0B27A', '#52BE80', '#5DADE2', '#AF7AC5', '#EC7063'
];

const CustomTooltip = ({ active, payload, label, chartType }) => {
  if (active && payload && payload.length) {
    // Sort payload by value (ranking or score)
    const sortedPayload = [...payload].sort((a, b) => {
      if (chartType === 'ranking') return a.value - b.value;
      return b.value - a.value;
    });

    return (
      <div className="custom-tooltip" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        fontSize: '12px'
      }}>
        <p style={{ fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '5px' }}>
          {new Date(label).toLocaleDateString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {sortedPayload.map((entry, index) => (
            <div key={index} style={{ color: entry.color, marginBottom: '3px' }}>
              <span style={{ fontWeight: 'bold' }}>
                {chartType === 'ranking' ? `#${entry.value}` : entry.value}
              </span>
              {' - '}
              {entry.name.replace(`_${chartType}`, '')}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function LeaderboardGraph({ data, teams, selectedChartType = 'ranking' }) {
  // Determine which teams to show initially (top 5 by default if too many)
  const [activeTeams, setActiveTeams] = useState(() => {
    // Default to all teams if <= 7, otherwise just the first 5 found in the list
    if (teams.length <= 7) return teams.map(t => t.teamName);
    return teams.slice(0, 5).map(t => t.teamName);
  });

  const allTeamNames = useMemo(() => teams.map(t => t.teamName).sort(), [teams]);

  const toggleTeam = (teamName) => {
    setActiveTeams(prev => {
      if (prev.includes(teamName)) {
        // Don't allow unselecting the last team
        if (prev.length === 1) return prev;
        return prev.filter(t => t !== teamName);
      } else {
        return [...prev, teamName];
      }
    });
  };



  const getYAxisLabel = (type) => {
    switch (type) {
      case 'ranking': return 'Position';
      default: return 'Points';
    }
  };

  const selectAll = () => setActiveTeams(allTeamNames);
  const selectTop5 = () => {
    // Attempt to parse sorting based on current data if possible, or just take first 5 from props
    setActiveTeams(teams.slice(0, 5).map(t => t.teamName));
  };

  return (
    <div className="leaderboard-graph-container" style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      marginTop: '20px',
      marginBottom: '30px'
    }}>
      <div className="graph-controls" style={{ marginBottom: '15px' }}>
        <div className="team-filters" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '10px',
          maxHeight: '100px',
          overflowY: 'auto'
        }}>
          <button 
            onClick={selectAll}
            style={{
              padding: '4px 8px',
              fontSize: '11px',
              borderRadius: '12px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              background: '#f0f0f0'
            }}
          >
            All
          </button>
          <button 
            onClick={selectTop5}
            style={{
              padding: '4px 8px',
              fontSize: '11px',
              borderRadius: '12px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              background: '#f0f0f0'
            }}
          >
            Reset (Top 5)
          </button>
          <div style={{ width: '1px', background: '#ccc', margin: '0 5px' }}></div>
          {allTeamNames.map((teamName, index) => {
            const isActive = activeTeams.includes(teamName);
            const teamColor = TEAM_COLORS[index % TEAM_COLORS.length];
            // Format very long names
            const displayName = teamName.length > 20 ? teamName.substring(0, 18) + '...' : teamName;
            
            return (
              <button
                key={teamName}
                onClick={() => toggleTeam(teamName)}
                style={{
                  padding: '4px 10px',
                  fontSize: '12px',
                  borderRadius: '15px',
                  border: `1px solid ${isActive ? teamColor : '#ddd'}`,
                  backgroundColor: isActive ? teamColor : 'transparent',
                  color: isActive ? '#fff' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isActive ? 1 : 0.6
                }}
                title={teamName}
              >
                {displayName}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ height: '400px', width: '100%' }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(t) => new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              stroke="#888"
              fontSize={12}
              tickMargin={10}
            />
            <YAxis 
              reversed={selectedChartType === 'ranking'}
              domain={selectedChartType === 'ranking' ? [1, 'dataMax'] : ['dataMin', 'dataMax + 10']}
              label={{ 
                value: getYAxisLabel(selectedChartType), 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#666' }
              }}
              stroke="#888"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip chartType={selectedChartType} />} />
            <Brush 
              dataKey="timestamp" 
              height={30} 
              stroke="#8884d8"
              tickFormatter={(t) => new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            />
            <ReferenceLine y={0} stroke="#000" />
            
            {teams.filter(t => activeTeams.includes(t.teamName)).map((team, index) => {
              // Find original index for consistent coloring
              const colorIndex = allTeamNames.indexOf(team.teamName);
              const color = TEAM_COLORS[colorIndex % TEAM_COLORS.length];
              
              return (
                <Line
                  key={team.id}
                  type="monotone"
                  dataKey={`${team.teamName}_${selectedChartType}`}
                  name={team.teamName}
                  stroke={color}
                  strokeWidth={3}
                  dot={{ r: 3, strokeWidth: 1 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  connectNulls
                  animationDuration={800}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: '#999' }}>
        <p>Use the slider below the chart to zoom. Click team names above to filter.</p>
      </div>
    </div>
  );
}
