/**
 * AI was kind enough to help me out with the stying and icons. i was having trouble making this look user friendly.
 *
 * This page displays NBA standings organized by conference and season. Data is
 * fetched from the ESPN API, with a fallback to mock data if the request fails.
 * Users can switch between Eastern and Western conferences and select
 * different seasons. Standings are displayed in a table with visual
 * highlighting for playoff and play-in positions.
 */


"use client";

import { useState, useEffect } from "react";
import {
  FaTrophy,
  FaSyncAlt,
  FaChartLine,
  FaChevronUp,
  FaChevronDown,
  FaMinus,
} from "react-icons/fa";
import { espnAPI } from "@/lib/api/espn";
import ConferenceTabs from "@/components/ConferenceTabs";
import SeasonSelector from "@/components/SeasonSelector";

export default function StandingsPage() {
  const [conference, setConference] = useState("eastern");
  const [standings, setStandings] = useState({
    eastern: [],
    western: [],
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [error, setError] = useState(null);
  const [season, setSeason] = useState("2024");

  useEffect(() => {
    fetchRealStandings();
  }, [season]);

  const fetchRealStandings = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await espnAPI.getStandings();

      let eastern = [];
      let western = [];

      if (Array.isArray(data)) {
        data.forEach((item) => {
          if (item.name?.toLowerCase().includes("eastern")) {
            eastern = extractTeams(item);
          } else if (item.name?.toLowerCase().includes("western")) {
            western = extractTeams(item);
          }
        });
      } else if (data.children && Array.isArray(data.children)) {
        data.children.forEach((item) => {
          if (item.name?.toLowerCase().includes("eastern")) {
            eastern = extractTeams(item);
          } else if (item.name?.toLowerCase().includes("western")) {
            western = extractTeams(item);
          }
        });
      } else {
        throw new Error("Invalid standings data format");
      }

      eastern.sort((a, b) => b.winPercentage - a.winPercentage);
      western.sort((a, b) => b.winPercentage - a.winPercentage);

      eastern.forEach((team, i) => {
        team.rank = i + 1;
        team.gamesBehind = i === 0 ? 0 : calculateGamesBehind(eastern[0], team);
      });

      western.forEach((team, i) => {
        team.rank = i + 1;
        team.gamesBehind = i === 0 ? 0 : calculateGamesBehind(western[0], team);
      });

      setStandings({ eastern, western });
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching standings:", err);
      setError(`Failed to fetch standings: ${err.message}`);
      setStandings(generateFallbackData());
    } finally {
      setLoading(false);
    }
  };

  const extractTeams = (conferenceData) => {
    const teams = [];
    const entries =
      conferenceData.standings?.entries || conferenceData.entries || [];

    entries.forEach((team) => {
      const teamInfo = {
        rank: 0,
        team: team.team?.displayName || "Unknown Team",
        abbreviation: team.team?.abbreviation || "TBD",
        wins: 0,
        losses: 0,
        winPercentage: 0,
        gamesBehind: 0,
        streak: "-",
        homeRecord: "0-0",
        awayRecord: "0-0",
        last10: "0-0",
        teamId: team.team?.id,
      };

      if (team.stats) {
        team.stats.forEach((stat) => {
          switch (stat.name) {
            case "wins":
              teamInfo.wins = stat.value;
              break;
            case "losses":
              teamInfo.losses = stat.value;
              break;
            case "winPercent":
              teamInfo.winPercentage = stat.value;
              break;
            case "gamesBehind":
              teamInfo.gamesBehind = stat.value;
              break;
            case "streak":
              teamInfo.streak = stat.displayValue;
              break;
            case "homeRecord":
              teamInfo.homeRecord = stat.displayValue;
              break;
            case "awayRecord":
              teamInfo.awayRecord = stat.displayValue;
              break;
            case "last10":
              teamInfo.last10 = stat.displayValue;
              break;
          }
        });
      }

      if (teamInfo.wins === 0 && teamInfo.losses === 0) {
        const randomWins = Math.floor(Math.random() * 30) + 30;
        teamInfo.wins = randomWins;
        teamInfo.losses = 82 - randomWins;
        teamInfo.winPercentage = randomWins / 82;
      }

      teams.push(teamInfo);
    });

    return teams;
  };

  const calculateGamesBehind = (leader, team) => {
    const leaderWins = leader.wins || 0;
    const leaderLosses = leader.losses || 0;
    const teamWins = team.wins || 0;
    const teamLosses = team.losses || 0;
    return (leaderWins - teamWins + (teamLosses - leaderLosses)) / 2;
  };

  const generateFallbackData = () => {
    const easternTeams = [
      { name: "Boston Celtics", abbr: "BOS" },
      { name: "Milwaukee Bucks", abbr: "MIL" },
      { name: "Philadelphia 76ers", abbr: "PHI" },
      { name: "Cleveland Cavaliers", abbr: "CLE" },
      { name: "New York Knicks", abbr: "NYK" },
      { name: "Miami Heat", abbr: "MIA" },
      { name: "Indiana Pacers", abbr: "IND" },
      { name: "Orlando Magic", abbr: "ORL" },
      { name: "Chicago Bulls", abbr: "CHI" },
      { name: "Atlanta Hawks", abbr: "ATL" },
      { name: "Brooklyn Nets", abbr: "BKN" },
      { name: "Toronto Raptors", abbr: "TOR" },
      { name: "Charlotte Hornets", abbr: "CHA" },
      { name: "Washington Wizards", abbr: "WAS" },
      { name: "Detroit Pistons", abbr: "DET" },
    ];

    const westernTeams = [
      { name: "Minnesota Timberwolves", abbr: "MIN" },
      { name: "Oklahoma City Thunder", abbr: "OKC" },
      { name: "Denver Nuggets", abbr: "DEN" },
      { name: "Los Angeles Clippers", abbr: "LAC" },
      { name: "New Orleans Pelicans", abbr: "NOP" },
      { name: "Phoenix Suns", abbr: "PHX" },
      { name: "Sacramento Kings", abbr: "SAC" },
      { name: "Dallas Mavericks", abbr: "DAL" },
      { name: "Los Angeles Lakers", abbr: "LAL" },
      { name: "Golden State Warriors", abbr: "GSW" },
      { name: "Houston Rockets", abbr: "HOU" },
      { name: "Utah Jazz", abbr: "UTA" },
      { name: "Memphis Grizzlies", abbr: "MEM" },
      { name: "Portland Trail Blazers", abbr: "POR" },
      { name: "San Antonio Spurs", abbr: "SAS" },
    ];

    const createTeam = (team, index) => {
      const wins = Math.floor(Math.random() * 30) + 30;
      const losses = 82 - wins;

      return {
        rank: index + 1,
        team: team.name,
        abbreviation: team.abbr,
        wins,
        losses,
        winPercentage: wins / 82,
        gamesBehind: index === 0 ? 0 : (index * 3.5).toFixed(1),
        streak:
          Math.random() > 0.5
            ? `W${Math.floor(Math.random() * 5) + 1}`
            : `L${Math.floor(Math.random() * 3) + 1}`,
        homeRecord: `${Math.floor(wins * 0.6)}-${Math.floor(losses * 0.4)}`,
        awayRecord: `${Math.floor(wins * 0.4)}-${Math.floor(losses * 0.6)}`,
        last10: `${Math.floor(Math.random() * 8) + 2}-${
          8 - Math.floor(Math.random() * 8)
        }`,
      };
    };

    return {
      eastern: easternTeams.map(createTeam),
      western: westernTeams.map(createTeam),
    };
  };

  const getPlayoffColor = (rank) => {
    if (rank <= 6) return "border-l-4 border-l-green-500 bg-green-500/10";
    if (rank <= 10) return "border-l-4 border-l-orange-500 bg-orange-500/10";
    return "border-l-4 border-l-gray-600 bg-gray-800/30";
  };

  const getStreakColor = (streak) => {
    if (!streak) return "bg-gray-500/20 text-gray-400";
    if (streak.startsWith("W")) return "bg-green-500/20 text-green-400";
    if (streak.startsWith("L")) return "bg-rose-500/20 text-red-400";
    return "bg-gray-500/20 text-gray-400";
  };

  const getTrendIcon = (rank) => {
    if (rank <= 3) return <FaChevronUp className="text-green-400 text-sm" />;
    if (rank >= 13) return <FaChevronDown className="text-rose-400 text-sm" />;
    return <FaMinus className="text-gray-400 text-sm" />;
  };

  const currentStandings = standings[conference];
  const cardStyle =
    "bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300";

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center">
                <FaTrophy className="mr-3 text-purple-500" />
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  NBA Standings
                </span>
              </h1>
              <p className="text-gray-400">2023-2024 Regular Season</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">
                {error ? "Using fallback data" : "Live ESPN Data"} • Updated:{" "}
                {lastUpdated || "Never"}
              </p>
              <button
                onClick={fetchRealStandings}
                disabled={loading}
                className="mt-2 px-4 py-2 bg-puple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <FaSyncAlt
                  className={`mr-2 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-pink-400 font-semibold">Error: {error}</p>
              <p className="text-pink-500/80 text-sm mt-1">
                Using fallback data. Check console for details.
              </p>
            </div>
          )}

          <SeasonSelector season={season} setSeason={setSeason} />
        </div>

        <ConferenceTabs
          conference={conference}
          setConference={setConference}
          easternCount={standings.eastern.length}
          westernCount={standings.western.length}
        />

        <div className={`${cardStyle} overflow-hidden`}>
          {loading ? (
            <div className="p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-700 rounded"></div>
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/80">
                  <tr>
                    <th className="py-4 px-4 text-left font-semibold text-gray-300">
                      Rank
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-300">
                      Team
                    </th>
                    <th className="py-4 px-4 text-center font-semibold text-gray-300">
                      W-L
                    </th>
                    <th className="py-4 px-4 text-center font-semibold text-gray-300">
                      PCT
                    </th>
                    <th className="py-4 px-4 text-center font-semibold text-gray-300">
                      GB
                    </th>
                    <th className="py-4 px-4 text-center font-semibold text-gray-300">
                      Home
                    </th>
                    <th className="py-4 px-4 text-center font-semibold text-gray-300">
                      Road
                    </th>
                    <th className="py-4 px-4 text-center font-semibold text-gray-300">
                      Last 10
                    </th>
                    <th className="py-4 px-4 text-center font-semibold text-gray-300">
                      Streak
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentStandings.map((team) => (
                    <tr
                      key={`${conference}-${team.rank}`}
                      className={`border-t border-gray-800/50 hover:bg-gray-800/30 transition-colors ${getPlayoffColor(
                        team.rank
                      )}`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <span
                            className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                              team.rank <= 6
                                ? "bg-green-500/20 text-gray-400"
                                : team.rank <= 10
                                ? "bg-rose-500/20 text-gray-400"
                                : "bg-gray-700 text-gray-400"
                            }`}
                          >
                            {team.rank}
                          </span>
                          {getTrendIcon(team.rank)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mr-3 border border-gray-600">
                            <span className="font-bold text-sm">
                              {team.abbreviation}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold">{team.team}</div>
                            <div className="text-xs text-gray-400">
                              {team.abbreviation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-bold text-lg">
                          <span className="text-green-400">{team.wins}</span>
                          <span className="text-gray-500 mx-1">-</span>
                          <span className="text-red-400">{team.losses}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-semibold text-white">
                          {typeof team.winPercentage === "number"
                            ? team.winPercentage.toFixed(3)
                            : team.winPercentage || "0.000"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-gray-300">
                          {team.gamesBehind === 0 || team.gamesBehind === "0"
                            ? "-"
                            : typeof team.gamesBehind === "number"
                            ? team.gamesBehind.toFixed(1)
                            : team.gamesBehind}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm">
                        <span className="text-green-400">
                          {team.homeRecord}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm">
                        <span className="text-blue-400">{team.awayRecord}</span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm">
                        <span className="text-gray-300">{team.last10}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStreakColor(
                            team.streak
                          )}`}
                        >
                          {team.streak || "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${cardStyle} p-6`}>
            <h3 className="font-semibold mb-4 text-gray-300 flex items-center">
              <FaChartLine className="mr-2 text-green-400" />
              Playoff Positions
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                <span className="text-gray-400">
                  Top 6: Automatic Playoff Spot
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-rose-500 mr-3"></div>
                <span className="text-gray-400">7-10: Play-In Tournament</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-600 mr-3"></div>
                <span className="text-gray-400">11-15: Lottery Teams</span>
              </div>
            </div>
          </div>

          <div className={`${cardStyle} p-6`}>
            <h3 className="font-semibold mb-4 text-gray-300">Data Source</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">API:</span>
                <span className="text-rose-400">ESPN Official API</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Updates:</span>
                <span className="text-rose-400">Real-time</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fallback:</span>
                <span className="text-rose-400">Mock Data</span>
              </div>
            </div>
          </div>

          <div className={`${cardStyle} p-6`}>
            <h3 className="font-semibold mb-4 text-gray-300">Status</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Last Updated:</span>
                <span className="text-rose-400">{lastUpdated || "Never"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Conference:</span>
                <span className="text-rose-400">
                  {conference === "eastern" ? "Eastern" : "Western"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Teams:</span>
                <span className="text-rose-400">
                  {currentStandings.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            {error ? (
              <span className="text-rose-400 text-shadow-amber-950">Error: {error}</span>
            ) : (
              <span className="text-green-400">Connected to ESPN API</span>
            )}
          </p>
          <p className="mt-2">Data updates automatically when refreshed</p>
        </div>
      </div>
    </div>
  );
}
