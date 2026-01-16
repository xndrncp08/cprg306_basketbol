/**
 *
 * This page displays a list of NBA news articles with filtering and search
 * functionality. News data is fetched from the ESPN API when the component
 * mounts. Users can filter articles by category or search by headline or
 * description. Articles are rendered using the reusable NewsCard component,
 * and the layout adapts responsively for desktop and mobile screens.
 */


"use client";

import { useState, useEffect } from "react";
import {
  FaNewspaper,
  FaCalendar,
  FaTag,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { espnAPI } from "@/lib/api/espn";
import NewsCard from "@/components/NewsCard";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await espnAPI.getNews();
      setNews(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news.filter((article) => {
    const matchesSearch =
      article.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "all") return matchesSearch;
    if (filter === "featured")
      return article.categories?.[0]?.description
        ?.toLowerCase()
        .includes("featured");

    return (
      matchesSearch &&
      article.categories?.[0]?.description
        ?.toLowerCase()
        .includes(filter.toLowerCase())
    );
  });

  const categories = [
    { id: "all", name: "All News" },
    { id: "featured", name: "Featured" },
    { id: "game", name: "Game Recaps" },
    { id: "trade", name: "Trade Rumors" },
    { id: "injury", name: "Injury Reports" },
    { id: "draft", name: "Draft" },
  ];

  const cardStyle =
    "bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300";

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center">
            <FaNewspaper className="mr-4 text-purple-500" />
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              NBA News
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Latest updates, rumors, and analysis from around the league
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className={`${cardStyle} p-6 mb-6`}>
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <FaTag className="mr-2 text-purple-400" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      filter === category.id
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={`${cardStyle} p-6`}>
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <FaCalendar className="mr-2 text-purple-400" />
                Latest Update
              </h3>
              <p className="text-gray-300 mb-2">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-400 text-sm">
                {news.length} articles available
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                />
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              </div>
            </div>

            <button
              onClick={fetchNews}
              disabled={loading}
              className="mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? "Refreshing..." : "Refresh News"}
            </button>

            {loading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`${cardStyle} p-6 h-40 animate-pulse`}
                  ></div>
                ))}
              </div>
            ) : filteredNews.length > 0 ? (
              <div className="space-y-6">
                {filteredNews.map((article, index) => (
                  <NewsCard
                    key={article.links?.web?.href || index}
                    article={article}
                    fullView
                  />
                ))}
              </div>
            ) : (
              <div className={`${cardStyle} p-12 text-center`}>
                <p className="text-gray-400 text-lg">No news articles found</p>
                <p className="text-gray-500 text-sm mt-2">
                  {searchTerm
                    ? "Try a different search term"
                    : "Check back later for latest NBA news"}
                </p>
              </div>
            )}

            {filteredNews.length > 0 && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center text-gray-400 text-sm">
                  <FaExternalLinkAlt className="mr-2" />
                  <span>Powered by ESPN API</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
