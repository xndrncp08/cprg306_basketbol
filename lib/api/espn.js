/**
 *
 * This file acts as a centralized wrapper for ESPN API requests used
 * throughout the application. It provides helper functions for fetching
 * scoreboards, news, standings, teams, and game summaries. Errors are logged
 * and rethrown so calling components can handle failures appropriately.
 */


import axios from "axios";

const BASE_URL = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba";

export const espnAPI = {
  async getScoreboard(date = null) {
    try {
      let url = `${BASE_URL}/scoreboard`;
      if (date) {
        const formattedDate = date.replace(/-/g, "");
        url += `?dates=${formattedDate}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching scoreboard:", error);
      throw error;
    }
  },

  async getNews() {
    try {
      const response = await axios.get(`${BASE_URL}/news`);
      return response.data;
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },

  async getStandings() {
    try {
      const response = await axios.get(`${BASE_URL}/standings`);
      return response.data;
    } catch (error) {
      console.error("Error fetching standings:", error);
      throw error;
    }
  },

  async getTeams() {
    try {
      const response = await axios.get(`${BASE_URL}/teams`);
      return response.data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },

  async getTeam(teamId) {
    try {
      const response = await axios.get(`${BASE_URL}/teams/${teamId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching team:", error);
      throw error;
    }
  },

  async getGameSummary(gameId) {
    try {
      const response = await axios.get(`${BASE_URL}/summary?event=${gameId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching game summary:", error);
      throw error;
    }
  },
};
