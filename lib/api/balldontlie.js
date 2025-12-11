import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({
  apiKey: process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY,
});

export const ballDontLieAPI = {
  //Get all players with pagination
  async getPlayers(page = 1, perPage = 25) {
    try {
      const response = await api.nba.getPlayers({
        page,
        per_page: perPage,
      });
      return {
        data: response.data || [],
        meta: response.meta || { total_pages: 1 },
      };
    } catch (error) {
      console.error("Error fetching players:", error);
      return { data: [], meta: { total_pages: 1 } };
    }
  },

  //Get specific player
  async getPlayer(playerId) {
    try {
      const response = await api.nba.getPlayer(playerId);
      return response;
    } catch (error) {
      console.error("Error fetching player:", error);
      return null;
    }
  },

  //Search players
  async searchPlayers(query, limit = 10) {
    try {
      const response = await api.nba.getPlayers({
        search: query,
        per_page: limit,
      });
      return response.data || [];
    } catch (error) {
      console.error("Error searching players:", error);
      return [];
    }
  },

  //Get all teams
  async getTeams() {
    try {
      const response = await api.nba.getTeams();
      return response.data || [];
    } catch (error) {
      console.error("Error fetching teams:", error);
      return [];
    }
  },

  //Get specific team
  async getTeam(teamId) {
    try {
      const response = await api.nba.getTeam(teamId);
      return response;
    } catch (error) {
      console.error("Error fetching team:", error);
      return null;
    }
  },

  //Get games for date
  async getGamesByDate(date) {
    try {
      const response = await api.nba.getGames({
        dates: [date],
        per_page: 100,
      });
      return response.data || [];
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  },

  //Get all games (with filters)
  async getGames(season = 2023, page = 1) {
    try {
      const response = await api.nba.getGames({
        season,
        page,
        per_page: 100,
      });
      return response;
    } catch (error) {
      console.error("Error fetching games:", error);
      return { data: [], meta: {} };
    }
  },
  /*
   *removed: 
   *getSeasonAverages()
   *getStats()
   *getPlayerStats()
   */

  // Helper function to generate mock stats
  generateMockStats(player) {
    // Generate realistic mock stats based on player position
    const baseStats = {
      G: { pts: 8.5, reb: 2.1, ast: 4.3, stl: 0.8, blk: 0.2 },
      F: { pts: 12.3, reb: 5.4, ast: 2.1, stl: 1.0, blk: 0.6 },
      C: { pts: 14.7, reb: 8.9, ast: 1.8, stl: 0.6, blk: 1.2 },
    };

    const position = player.position || "G";
    const base = baseStats[position] || baseStats.G;

    // Add some randomness lol
    return {
      pts: (base.pts + Math.random() * 8).toFixed(1),
      reb: (base.reb + Math.random() * 4).toFixed(1),
      ast: (base.ast + Math.random() * 3).toFixed(1),
      stl: (base.stl + Math.random() * 0.5).toFixed(1),
      blk: (base.blk + Math.random() * 0.5).toFixed(1),
      fg_pct: (0.42 + Math.random() * 0.15).toFixed(3),
      fg3_pct: (0.32 + Math.random() * 0.12).toFixed(3),
      ft_pct: (0.75 + Math.random() * 0.15).toFixed(3),
      min: (Math.random() * 15 + 20).toFixed(1),
    };
  },
};
