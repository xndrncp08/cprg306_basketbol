/**
 *
 * Thank you so much Claude Ai for helping me so much here lol
 * This page functions as a player directory with search, filtering, sorting,
 * and pagination. Player data is fetched from the BallDontLie API, with support
 * for searching by name and navigating through paginated results. Due to free
 * API limitations, player statistics are generated as mock data. Player
 * information is displayed using reusable PlayerCard components.
 */

 
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaUser,
  FaBasketballBall,
} from "react-icons/fa";
import { ballDontLieAPI } from "@/lib/api/balldontlie";
import PlayerCard from "@/components/PlayerCard";

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPlayers = useCallback(async (page = 1, search = "") => {
    try {
      setLoading(true);
      const response = await ballDontLieAPI.getPlayers(page, 20);
      setPlayers(response.data || []);
      setTotalPages(response.meta?.total_pages || 1);
    } catch (error) {
      console.error("Error fetching players:", error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPlayers = async () => {
    if (!searchTerm.trim()) {
      fetchPlayers();
      return;
    }

    try {
      setLoading(true);
      const results = await ballDontLieAPI.searchPlayers(searchTerm);
      setPlayers(results);
      setTotalPages(1);
    } catch (error) {
      console.error("Error searching players:", error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const filteredPlayers = players
    .filter((player) => {
      if (filter === "all") return true;
      if (filter === "active") return true;
      return player.position === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return `${a.first_name} ${a.last_name}`.localeCompare(
            `${b.first_name} ${b.last_name}`
          );
        case "team":
          return (a.team?.full_name || "").localeCompare(
            b.team?.full_name || ""
          );
        default:
          return 0;
      }
    });

  const positions = [
    { id: "all", name: "All Positions" },
    { id: "G", name: "Guards" },
    { id: "F", name: "Forwards" },
    { id: "C", name: "Centers" },
  ];

  const cardStyle =
    "bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300";

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center">
            <FaUser className="mr-4 text-blue-500" />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              NBA Players
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Search and explore all NBA players with detailed statistics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className={`${cardStyle} p-6 mb-6`}>
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <FaFilter className="mr-2 text-blue-400" />
                Filter by Position
              </h3>
              <div className="space-y-2">
                {positions.map((position) => (
                  <button
                    key={position.id}
                    onClick={() => setFilter(position.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      filter === position.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {position.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={`${cardStyle} p-6`}>
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <FaSort className="mr-2 text-green-400" />
                Sort By
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSortBy("name")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    sortBy === "name"
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Name (A-Z)
                </button>
                <button
                  onClick={() => setSortBy("team")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    sortBy === "team"
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Team
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search players by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && searchPlayers()}
                    className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                  <FaSearch className="absolute left-4 top-4 text-gray-400" />
                </div>
                <button
                  onClick={searchPlayers}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <FaSearch className="mr-2" />
                  Search
                </button>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-400">
                <FaBasketballBall className="mr-2" />
                <span>
                  {searchTerm
                    ? `Search results for "${searchTerm}"`
                    : `Showing ${filteredPlayers.length} players`}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`${cardStyle} p-6 h-64 animate-pulse`}
                  ></div>
                ))}
              </div>
            ) : filteredPlayers.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} detailed />
                  ))}
                </div>

                {!searchTerm && totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-gray-300">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={`${cardStyle} p-12 text-center`}>
                <p className="text-gray-400 text-lg">No players found</p>
                <p className="text-gray-500 text-sm mt-2">
                  {searchTerm
                    ? "Try a different search term"
                    : "Try refreshing the page"}
                </p>
              </div>
            )}

            {filteredPlayers.length > 0 && (
              <div className="mt-8 text-center text-sm text-gray-400">
                <p>
                  Stats are simulated for Free Tier API. Real stats require
                  BallDontLie Pro subscription.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
