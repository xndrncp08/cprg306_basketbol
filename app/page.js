"use client";

import { useState, useEffect } from "react";
import {
  FaBasketballBall,
  FaFire,
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaNewspaper,
} from "react-icons/fa";
import { espnAPI } from "@/lib/api/espn";
import { ballDontLieAPI } from "@/lib/api/balldontlie";
import {
  formatDate,
  formatGameTime,
  getTeamAbbreviation,
} from "@/lib/utils/formatters";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState({
    games: true,
    players: true,
    news: true,
  });
  const [today] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetchHomePageData();
  }, []);

  const fetchHomePageData = async () => {
    try {
      setLoading({ games: true, players: true, news: true });

      // Fetch all data in parallel
      const [gamesData, playersData, newsData] = await Promise.allSettled([
        espnAPI.getScoreboard(today),
        ballDontLieAPI.getPlayers(1, 8),
        espnAPI.getNews(),
      ]);

      // Handle games data (ESPN - No API key needed)
      if (gamesData.status === "fulfilled") {
        setGames(gamesData.value.events || []);
      } else {
        console.error("Error fetching games:", gamesData.reason);
        setGames([]);
      }

      // Handle players data (BallDontLie Free Tier)
      if (playersData.status === "fulfilled") {
        setPlayers(playersData.value.data || []);
      } else {
        console.error("Error fetching players:", playersData.reason);
        setPlayers([]);
      }

      // Handle news data (ESPN - No API key needed)
      if (newsData.status === "fulfilled") {
        setNews(newsData.value.articles || []);
      } else {
        console.error("Error fetching news:", newsData.reason);
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching home page data:", error);
    } finally {
      setLoading({ games: false, players: false, news: false });
    }
  };

  const cardStyle =
    "bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300";

  const isAnyLoading = loading.games || loading.players || loading.news;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                Basketbol
              </span>
              <br />
              <span className="text-white">NBA 2K Inspired Stats</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real-time NBA statistics with our immersive 2K-style interface
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Using Free Tier API - Some features limited
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: <FaFire />,
                title: "Live Scores",
                desc: `${games.length} games today`,
                stat: games.length,
                color: "from-red-500 to-orange-500",
              },
              {
                icon: <FaTrophy />,
                title: "Standings",
                desc: "Conference rankings",
                stat: "30 teams",
                color: "from-yellow-500 to-green-500",
              },
              {
                icon: <FaUsers />,
                title: "Players",
                desc: `${players.length} featured`,
                stat: players.length,
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <FaNewspaper />,
                title: "News",
                desc: `${news.length} articles`,
                stat: news.length,
                color: "from-purple-500 to-pink-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`${cardStyle} p-6 text-center hover:scale-105`}
              >
                <div
                  className={`text-4xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{feature.desc}</p>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {feature.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Games Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center">
            <FaBasketballBall className="mr-3 text-blue-500" />
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Today's Games
            </span>
          </h2>
          <span className="text-sm text-gray-400">{formatDate(today)}</span>
        </div>

        {loading.games ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`${cardStyle} p-6 h-40 animate-pulse`}
              ></div>
            ))}
          </div>
        ) : games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(0, 6).map((game) => {
              const competition = game.competitions?.[0];
              const competitors = competition?.competitors || [];
              const homeTeam = competitors.find((c) => c.homeAway === "home");
              const awayTeam = competitors.find((c) => c.homeAway === "away");
              const status = game.status?.type?.state || "unknown";

              return (
                <div key={game.id} className={`${cardStyle} p-6`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400">
                      {game.date ? formatGameTime(game.date) : "TBD"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        status === "in"
                          ? "bg-red-500/20 text-red-400 animate-pulse"
                          : status === "post"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {status === "in"
                        ? "LIVE"
                        : status === "post"
                        ? "FINAL"
                        : "UPCOMING"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[awayTeam, homeTeam].map((team, idx) => {
                      if (!team) return null;
                      return (
                        <div
                          key={team.id || idx}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                              <span className="font-bold">
                                {getTeamAbbreviation(team.team?.displayName) ||
                                  team.team?.abbreviation ||
                                  "TBD"}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold">
                                {team.team?.displayName || "Unknown Team"}
                              </div>
                              <div className="text-sm text-gray-400">
                                ({team.records?.[0]?.summary || "0-0"})
                              </div>
                            </div>
                          </div>
                          <div className="text-2xl font-bold">
                            {team.score !== undefined ? team.score : "-"}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {status === "in" && competition?.status && (
                    <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                      <div className="text-sm text-gray-300">
                        {competition.status.period
                          ? `Q${competition.status.period}`
                          : ""}
                        {competition.status.displayClock
                          ? ` • ${competition.status.displayClock}`
                          : ""}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`${cardStyle} p-12 text-center`}>
            <p className="text-gray-400 text-lg">
              No games scheduled for today
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Check back tomorrow for upcoming games
            </p>
          </div>
        )}
      </div>

      {/* Featured Players */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              Featured Players
            </span>
          </h2>
          <a
            href="/players"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            View All Players →
          </a>
        </div>

        {loading.players ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`${cardStyle} p-6 h-48 animate-pulse`}
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {players.map((player) => {
              // Generate mock stats for Free Tier
              const mockStats = ballDontLieAPI.generateMockStats(player);

              return (
                <div
                  key={player.id}
                  className={`${cardStyle} p-6 text-center hover:scale-105 transition-transform`}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                    {player.first_name[0]}
                    {player.last_name[0]}
                  </div>
                  <h3 className="font-bold text-lg mb-1">
                    {player.first_name} {player.last_name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    #{player.jersey_number || "00"} • {player.position || "G"}
                  </p>
                  <p className="text-blue-400 font-semibold mb-4">
                    {player.team?.full_name || "Free Agent"}
                  </p>

                  {/* Mock Stats for Free Tier */}
                  <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                    <div>
                      <div className="font-bold text-blue-500">
                        {mockStats.pts}
                      </div>
                      <div className="text-gray-400">PPG</div>
                    </div>
                    <div>
                      <div className="font-bold text-purple-500">
                        {mockStats.reb}
                      </div>
                      <div className="text-gray-400">RPG</div>
                    </div>
                    <div>
                      <div className="font-bold text-orange-500">
                        {mockStats.ast}
                      </div>
                      <div className="text-gray-400">APG</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-500">
                        {(mockStats.fg_pct * 100).toFixed(1)}%
                      </div>
                      <div className="text-gray-400">FG%</div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Stats are simulated for Free Tier
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Latest News */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center">
            <FaNewspaper className="mr-3 text-orange-500" />
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Latest NBA News
            </span>
          </h2>
          <a
            href="/news"
            className="text-orange-400 hover:text-orange-300 text-sm"
          >
            All News →
          </a>
        </div>

        {loading.news ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`${cardStyle} p-6 h-32 animate-pulse`}
              ></div>
            ))}
          </div>
        ) : news.length > 0 ? (
          <div className="space-y-4">
            {news.slice(0, 5).map((article, index) => (
              <a
                key={article.links?.web?.href || index}
                href={article.links?.web?.href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardStyle} p-6 block hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">
                      {article.headline}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                      {article.description || "Read more about this story..."}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>
                        {article.categories?.[0]?.description || "NBA News"}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {article.published
                          ? new Date(article.published).toLocaleDateString()
                          : "Recent"}
                      </span>
                    </div>
                  </div>
                  {article.images?.[0]?.url && (
                    <div className="ml-4 flex-shrink-0">
                      <div className="w-24 h-24 bg-gray-700 rounded-lg overflow-hidden">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${article.images[0].url})`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className={`${cardStyle} p-12 text-center`}>
            <p className="text-gray-400 text-lg">No news articles available</p>
            <p className="text-gray-500 text-sm mt-2">
              Check back later for latest NBA news
            </p>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "All Players",
              href: "/players",
              desc: "Browse all NBA players",
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "Standings",
              href: "/standings",
              desc: "Conference rankings",
              color: "from-green-500 to-emerald-500",
            },
            {
              title: "Schedule",
              href: "/scores",
              desc: "Game schedule & scores",
              color: "from-orange-500 to-red-500",
            },
            {
              title: "Player Compare",
              href: "/compare",
              desc: "Compare player stats",
              color: "from-purple-500 to-pink-500",
            },
          ].map((link) => (
            <a
              key={link.title}
              href={link.href}
              className={`${cardStyle} p-8 text-center hover:scale-105 transition-transform bg-gradient-to-br ${link.color} bg-opacity-10 hover:bg-opacity-20`}
            >
              <h3 className="text-xl font-bold mb-2">{link.title}</h3>
              <p className="text-gray-300">{link.desc}</p>
              <div className="mt-4 text-blue-400">Explore →</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
