import { FaNewspaper } from "react-icons/fa";
import Card, { LoadingCard } from "../ui/Cards";
import NewsCard from "./NewsCard"; // Add this import

export default function NewsSection({ news = [], loading = false }) {
  return (
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

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <LoadingCard key={i} className="h-32" />
          ))}
        </div>
      ) : news.length > 0 ? (
        <div className="space-y-4">
          {news.slice(0, 5).map((article, index) => (
            <NewsCard
              key={article.links?.web?.href || index}
              article={article}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-gray-400 text-lg">No news articles available</p>
          <p className="text-gray-500 text-sm mt-2">
            Check back later for latest NBA news
          </p>
        </Card>
      )}
    </div>
  );
}
