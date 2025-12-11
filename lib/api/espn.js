import axios from 'axios'

const BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba'

export const espnAPI = {
  async getScoreboard(date = null) {
    try {
      let url = `${BASE_URL}/scoreboard`
      if (date) {
        const formattedDate = date.replace(/-/g, '')
        url += `?dates=${formattedDate}`
      }
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error('Error fetching scoreboard:', error)
      throw error
    }
  },

  async getTeams() {
    try {
      const response = await axios.get(`${BASE_URL}/teams`)
      return response.data
    } catch (error) {
      console.error('Error fetching teams:', error)
      throw error
    }
  },

  async getTeam(teamId) {
    try {
      const response = await axios.get(`${BASE_URL}/teams/${teamId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching team:', error)
      throw error
    }
  },

  async getNews() {
    try {
      const response = await axios.get(`${BASE_URL}/news`)
      return response.data
    } catch (error) {
      console.error('Error fetching news:', error)
      throw error
    }
  },

  async getStandings() {
    try {
      const response = await axios.get(`${BASE_URL}/standings`)
      return response.data
    } catch (error) {
      console.error('Error fetching standings:', error)
      throw error
    }
  },

  async getGameSummary(gameId) {
    try {
      const response = await axios.get(`${BASE_URL}/summary?event=${gameId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching game summary:', error)
      throw error
    }
  },

  async getPlayerStats(playerId) {
    try {
      // Note: ESPN doesn't have a direct player stats endpoint
      // I use BallDontLie for player stats
      throw new Error('Use BallDontLie API for player stats')
    } catch (error) {
      console.error('Error fetching player stats:', error)
      throw error
    }
  }
}