import Card, { LoadingCard } from "../ui/Cards";
import PlayerCard from "./PlayerCard";

export default function PlayersSection({ players = [], loading = false }) {
  return (
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

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <LoadingCard key={i} className="h-48" />
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
  );
}
