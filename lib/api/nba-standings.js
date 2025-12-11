// Simple ESPN API wrapper
export async function fetchNBAStandings() {
  try {
    console.log('Fetching NBA standings from ESPN API...')
    
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/standings')
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Log the structure to debug
    console.log('API response:', data)
    
    // Try to extract data from various possible structures
    let eastern = []
    let western = []
    
    if (Array.isArray(data)) {
      // Handle array response
      data.forEach(item => {
        if (item.name?.includes('Eastern')) {
          eastern = extractTeams(item)
        } else if (item.name?.includes('Western')) {
          western = extractTeams(item)
        }
      })
    } else if (data.children && Array.isArray(data.children)) {
      // Handle children structure
      data.children.forEach(item => {
        if (item.name?.includes('Eastern')) {
          eastern = extractTeams(item)
        } else if (item.name?.includes('Western')) {
          western = extractTeams(item)
        }
      })
    } else {
      throw new Error('Unknown API response structure')
    }
    
    // Sort by win percentage
    eastern.sort((a, b) => b.winPercentage - a.winPercentage)
    western.sort((a, b) => b.winPercentage - a.winPercentage)
    
    // Add ranks
    eastern.forEach((team, i) => team.rank = i + 1)
    western.forEach((team, i) => team.rank = i + 1)
    
    return { eastern, western }
    
  } catch (error) {
    console.error('Failed to fetch NBA standings:', error)
    throw error
  }
}

function extractTeams(conferenceData) {
  const teams = []
  const entries = conferenceData.standings?.entries || conferenceData.entries || []
  
  entries.forEach((team, index) => {
    const teamInfo = {
      rank: index + 1,
      team: team.team?.displayName || 'Unknown Team',
      abbreviation: team.team?.abbreviation || 'TBD',
      wins: 0,
      losses: 0,
      winPercentage: 0,
      gamesBehind: 0,
      streak: '-',
      homeRecord: '0-0',
      awayRecord: '0-0',
      last10: '0-0'
    }
    
    // Extract stats
    if (team.stats) {
      team.stats.forEach(stat => {
        switch(stat.name) {
          case 'wins': teamInfo.wins = stat.value; break
          case 'losses': teamInfo.losses = stat.value; break
          case 'winPercent': teamInfo.winPercentage = stat.value; break
          case 'gamesBehind': teamInfo.gamesBehind = stat.value; break
          case 'streak': teamInfo.streak = stat.displayValue; break
          case 'homeRecord': teamInfo.homeRecord = stat.displayValue; break
          case 'awayRecord': teamInfo.awayRecord = stat.displayValue; break
          case 'last10': teamInfo.last10 = stat.displayValue; break
        }
      })
    }
    
    teams.push(teamInfo)
  })
  
  return teams
}