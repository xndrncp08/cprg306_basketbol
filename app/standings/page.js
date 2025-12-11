"use client";

import { useState, useEffect } from "react";
import { FaTrophy, FaSyncAlt } from "react-icons/fa";
import StandingsTable from "../../components/ui/StandingsTable";
import ConferenceTabs from "../../components/ui/ConferenceTabs";
import SeasonSelector from "../../components/ui/SeasonSelector";
import { fetchNBAStandings } from "@/lib/api/nba-standings";

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
    loadStandings();
  }, [season]);

  const loadStandings = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Loading NBA standings...");

      const data = await fetchNBAStandings();

      setStandings({
        eastern: data.eastern || [],
        western: data.western || [],
      });

      setLastUpdated(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } catch (err) {
      console.error("Error loading standings:", err);
      setError(err.message);
      // Use fallback data
      setStandings(generateFallbackData());
    } finally {
      setLoading(false);
    }
  };

  const currentStandings = standings[conference];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <FaTrophy className="mr-3 text-yellow-500" />
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  NBA Standings
                </span>
              </h1>
              <p className="text-gray-400">2023-2024 Regular Season</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">
                {error ? "⚠️ Using fallback data" : "✅ Live Data"} • Updated:{" "}
                {lastUpdated || "Never"}
              </p>
              <button
                onClick={loadStandings}
                disabled={loading}
                className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <FaSyncAlt
                  className={`mr-2 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 font-semibold">Error: {error}</p>
              <p className="text-red-500/80 text-sm mt-1">
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

        <StandingsTable
          standings={currentStandings}
          conference={conference}
          loading={loading}
        />

        <DebugInfo error={error} lastUpdated={lastUpdated} />
      </div>
    </div>
  );
}

// Fallback data generator (minimal)
const generateFallbackData = () => {
  const easternTeams = [
    "Boston Celtics",
    "Milwaukee Bucks",
    "Philadelphia 76ers",
    "Cleveland Cavaliers",
    "New York Knicks",
    "Miami Heat",
    "Indiana Pacers",
    "Orlando Magic",
    "Chicago Bulls",
    "Atlanta Hawks",
    "Brooklyn Nets",
    "Toronto Raptors",
    "Charlotte Hornets",
    "Washington Wizards",
    "Detroit Pistons",
  ];

  const westernTeams = [
    "Minnesota Timberwolves",
    "Oklahoma City Thunder",
    "Denver Nuggets",
    "Los Angeles Clippers",
    "New Orleans Pelicans",
    "Phoenix Suns",
    "Sacramento Kings",
    "Dallas Mavericks",
    "Los Angeles Lakers",
    "Golden State Warriors",
    "Houston Rockets",
    "Utah Jazz",
    "Memphis Grizzlies",
    "Portland Trail Blazers",
    "San Antonio Spurs",
  ];

  const createTeam = (name, index) => {
    const abbr = name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .substring(0, 3);
    const wins = Math.floor(Math.random() * 30) + 30;
    const losses = 82 - wins;

    return {
      rank: index + 1,
      team: name,
      abbreviation: abbr,
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

function DebugInfo({ error, lastUpdated }) {
  return (
    <div className="mt-8 text-center text-sm text-gray-500">
      <p>
        {error ? (
          <span className="text-red-400">⚠️ Error: {error}</span>
        ) : (
          <span className="text-green-400">✅ Data loaded successfully</span>
        )}
      </p>
      <p className="mt-2">Last updated: {lastUpdated || "Never"}</p>
    </div>
  );
}
