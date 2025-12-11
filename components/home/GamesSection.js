import { FaBasketballBall } from "react-icons/fa";
import Card, { LoadingCard } from "../ui/Cards";
import GameCard from "./GameCard";

export default function GamesSection({ games = [], loading = false, today }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold flex items-center">
          <FaBasketballBall className="mr-3 text-blue-500" />
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Today's Games
          </span>
        </h2>
        <span className="text-sm text-gray-400">
          {today
            ? new Date(today).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Today"}
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <LoadingCard key={i} className="h-40" />
          ))}
        </div>
      ) : games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.slice(0, 6).map((game) => (
            <GameCard key={game.id || Math.random()} game={game} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-gray-400 text-lg">No games scheduled for today</p>
          <p className="text-gray-500 text-sm mt-2">
            Check back tomorrow for upcoming games
          </p>
        </Card>
      )}
    </div>
  );
}
