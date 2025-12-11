// Format player name
export function formatPlayerName(player) {
  if (!player) return ''
  return `${player.first_name || ''} ${player.last_name || ''}`.trim()
}

// Format position
export function formatPosition(position) {
  const positions = {
    'G': 'Guard',
    'F': 'Forward',
    'C': 'Center',
    'G-F': 'Guard-Forward',
    'F-G': 'Forward-Guard',
    'F-C': 'Forward-Center',
    'C-F': 'Center-Forward'
  }
  return positions[position] || position || 'N/A'
}

// Format height
export function formatHeight(heightInches) {
  if (!heightInches) return 'N/A'
  const feet = Math.floor(heightInches / 12)
  const inches = heightInches % 12
  return `${feet}'${inches}"`
}

// Format game time
export function formatGameTime(dateString) {
  if (!dateString) return 'TBD'
  try {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch (e) {
    return 'TBD'
  }
}

// Format date
export function formatDate(dateString) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  } catch (e) {
    return dateString
  }
}

// Get team abbreviation
export function getTeamAbbreviation(teamName) {
  if (!teamName) return ''
  
  const abbreviations = {
    'Atlanta Hawks': 'ATL',
    'Boston Celtics': 'BOS',
    'Brooklyn Nets': 'BKN',
    'Charlotte Hornets': 'CHA',
    'Chicago Bulls': 'CHI',
    'Cleveland Cavaliers': 'CLE',
    'Dallas Mavericks': 'DAL',
    'Denver Nuggets': 'DEN',
    'Detroit Pistons': 'DET',
    'Golden State Warriors': 'GSW',
    'Houston Rockets': 'HOU',
    'Indiana Pacers': 'IND',
    'Los Angeles Clippers': 'LAC',
    'Los Angeles Lakers': 'LAL',
    'Memphis Grizzlies': 'MEM',
    'Miami Heat': 'MIA',
    'Milwaukee Bucks': 'MIL',
    'Minnesota Timberwolves': 'MIN',
    'New Orleans Pelicans': 'NOP',
    'New York Knicks': 'NYK',
    'Oklahoma City Thunder': 'OKC',
    'Orlando Magic': 'ORL',
    'Philadelphia 76ers': 'PHI',
    'Phoenix Suns': 'PHX',
    'Portland Trail Blazers': 'POR',
    'Sacramento Kings': 'SAC',
    'San Antonio Spurs': 'SAS',
    'Toronto Raptors': 'TOR',
    'Utah Jazz': 'UTA',
    'Washington Wizards': 'WAS'
  }
  return abbreviations[teamName] || teamName.substring(0, 3).toUpperCase()
}

// Generate 2K-style rating for Free Tier
export function calculateMockRating(player) {
  if (!player) return 75
  
  let rating = 70 // Base rating
  
  // Position adjustments
  if (player.position === 'C') rating += 5
  if (player.position === 'F') rating += 3
  
  // Height adjustments
  if (player.height > 82) rating += 8 // 6'10"+
  else if (player.height > 78) rating += 5 // 6'6"+
  else if (player.height > 74) rating += 2 // 6'2"+
  
  // Weight adjustments
  if (player.weight > 240) rating += 3
  
  // Jersey number effect (just for fun)
  if (player.jersey_number) {
    const num = parseInt(player.jersey_number)
    if (num === 23 || num === 24 || num === 33) rating += 5 // Legendary numbers
  }
  
  return Math.min(Math.round(rating), 99)
}

// Format number with one decimal
export function formatStat(stat) {
  if (typeof stat === 'number') {
    return stat.toFixed(1)
  }
  return stat || '0.0'
}