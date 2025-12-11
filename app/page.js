"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeatureCards from "@/components/home/FeatureCards";
import GamesSection from "@/components/home/GamesSection";
import PlayersSection from "@/components/home/PlayersSection";
import NewsSection from "@/components/home/NewsSection";
import QuickLinks from "@/components/home/QuickLinks";

// Mock API functions (replace with your actual API calls)
const espnAPI = {
  getScoreboard: async (date) => {
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`
    );
    return res.json();
  },
  getNews: async () => {
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news`
    );
    return res.json();
  },
};

const ballDontLieAPI = {
  getPlayers: async (page, per_page) => {
    const apiKey = process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY;
    const res = await fetch(
      `https://api.balldontlie.io/v1/players?page=${page}&per_page=${per_page}`,
      { headers: { Authorization: apiKey } }
    );
    return res.json();
  },
};

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

      const [gamesData, playersData, newsData] = await Promise.allSettled([
        espnAPI.getScoreboard(today),
        ballDontLieAPI.getPlayers(1, 8),
        espnAPI.getNews(),
      ]);

      if (gamesData.status === "fulfilled") {
        setGames(gamesData.value.events || []);
      }

      if (playersData.status === "fulfilled") {
        setPlayers(playersData.value.data || []);
      }

      if (newsData.status === "fulfilled") {
        setNews(newsData.value.articles || []);
      }
    } catch (error) {
      console.error("Error fetching home page data:", error);
    } finally {
      setLoading({ games: false, players: false, news: false });
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="container mx-auto px-4">
        <FeatureCards
          stats={{
            games: games.length,
            players: players.length,
            news: news.length,
          }}
        />
      </div>

      <GamesSection games={games} loading={loading.games} today={today} />

      <PlayersSection players={players} loading={loading.players} />

      <NewsSection news={news} loading={loading.news} />

      <QuickLinks />
    </div>
  );
}
