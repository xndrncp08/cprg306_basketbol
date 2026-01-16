/**
 *
 * This page serves as the main dashboard of the application, displaying
 * today’s games, featured players, latest news, and quick navigation links.
 * Data for games, players, and news is fetched in parallel using
 * Promise.allSettled(), allowing each section to load independently and fail
 * safely without blocking the rest of the page. Skeleton loaders are shown
 * while data is being retrieved to improve user experience.
 */


'use client';

import { useState, useEffect } from 'react';
import { FaBasketballBall, FaFire, FaTrophy, FaUsers, FaNewspaper } from 'react-icons/fa';
import { espnAPI } from '@/lib/api/espn';
import { ballDontLieAPI } from '@/lib/api/balldontlie';
import { formatDate, formatGameTime, getTeamAbbreviation } from '@/lib/utils/formatters';
import GameCard from '@/components/GameCard';
import PlayerCard from '@/components/PlayerCard';
import NewsCard from '@/components/NewsCard';

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState({
    games: true,
    players: true,
    news: true,
  });
  const [today] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchHomePageData();
  }, []);

  const fetchHomePageData = async () => {
    try {
      setLoading({ games: true, players: true, news: true });

      const [gamesData, playersData, newsData] = await Promise.allSettled([
        espnAPI.getScoreboard(today),
        ballDontLieAPI.getPlayers(1, 8),
        espnAPI.getNews(),
      ]);

      if (gamesData.status === 'fulfilled') {
        setGames(gamesData.value.events || []);
      } else {
        console.error('Error fetching games:', gamesData.reason);
        setGames([]);
      }

      if (playersData.status === 'fulfilled') {
        setPlayers(playersData.value.data || []);
      } else {
        console.error('Error fetching players:', playersData.reason);
        setPlayers([]);
      }

      if (newsData.status === 'fulfilled') {
        setNews(newsData.value.articles || []);
      } else {
        console.error('Error fetching news:', newsData.reason);
        setNews([]);
      }
    } catch (error) {
      console.error('Error fetching home page data:', error);
    } finally {
      setLoading({ games: false, players: false, news: false });
    }
  };

  const cardStyle = 'bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300';
  const featureCards = [
    {
      icon: <FaFire />,
      title: 'Live Scores',
      desc: `${games.length} games today`,
      stat: games.length,
      color: 'from-purple-500 to-magenta-500',
    },
    {
      icon: <FaTrophy />,
      title: 'Standings',
      desc: 'Conference rankings',
      stat: '30 teams',
      color: 'from-purple-500 to-magenta-500',
    },
    {
      icon: <FaUsers />,
      title: 'Players',
      desc: `${players.length} featured`,
      stat: players.length,
      color: 'from-purple-500 to-magenta-500',
    },
    {
      icon: <FaNewspaper />,
      title: 'News',
      desc: `${news.length} articles`,
      stat: news.length,
      color: 'from-purple-500 to-magenta-500',
    },
  ];
  const quickLinks = [
    {
      title: 'All Players',
      href: '/players',
      desc: 'Browse all NBA players',
      color: 'from-purple-800 to-pink-900',
    },
    {
      title: 'Standings',
      href: '/standings',
      desc: 'Conference rankings',
      color: 'from-purple-800 to-pink-900',
    },
    {
      title: 'Schedule',
      href: '/scores',
      desc: 'Game schedule & scores',
      color: 'from-purple-800 to-pink-900',
    },
    {
      title: 'Player Compare',
      href: '/compare',
      desc: 'Compare player stats',
      color: 'from-purple-800 to-pink-900',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 via-rose-600 to-violet-500 bg-clip-text text-transparent">
                Basketbol
              </span>
              <br />
              <span className="text-white">NBA 2K Inspired Stats</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real-time NBA statistics
            </p>
            <p className="text-sm text-gray-400 mt-4">
              By Xander Rancap
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {featureCards.map((feature, index) => (
              <div
                key={index}
                className={`${cardStyle} p-8 text-center hover:purple-600`}
              >
                <div
                  className={`text-4xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{feature.desc}</p>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                  {feature.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center">
            <FaBasketballBall className="mr-3 text-purple-500" />
            <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              Today's Games
            </span>
          </h2>
          <span className="text-sm text-gray-400">{formatDate(today)}</span>
        </div>

        {loading.games ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${cardStyle} p-6 h-40 animate-pulse`}></div>
            ))}
          </div>
        ) : games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(0, 6).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className={`${cardStyle} p-12 text-center`}>
            <p className="text-gray-400 text-lg">No games scheduled for today</p>
            <p className="text-gray-500 text-sm mt-2">
              Check back tomorrow for upcoming games
            </p>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-purple-500 via-rose-800 to-purple-500 bg-clip-text text-transparent">
              Featured Players
            </span>
          </h2>
          <a href="/players" className="text-purple-400 hover:text-purple-500 text-sm">
            View All Players →
          </a>
        </div>

        {loading.players ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`${cardStyle} p-6 h-48 animate-pulse`}></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center">
            <FaNewspaper className="mr-3 text-purple-500" />
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Latest NBA News
            </span>
          </h2>
          <a href="/news" className="text-purple-400 hover:text-purple-300 text-sm">
            All News →
          </a>
        </div>

        {loading.news ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`${cardStyle} p-6 h-32 animate-pulse`}></div>
            ))}
          </div>
        ) : news.length > 0 ? (
          <div className="space-y-4">
            {news.slice(0, 5).map((article, index) => (
              <NewsCard key={article.links?.web?.href || index} article={article} />
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

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className={`${cardStyle} p-8 text-center hover:purple-600 transition-transform bg-gradient-to-br ${link.color} bg-opacity-10 hover:purple-600`}
            >
              <h3 className="text-xl font-bold mb-2">{link.title}</h3>
              <p className="text-gray-300">{link.desc}</p>
              <div className="mt-4 text-white-400">Explore →</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}