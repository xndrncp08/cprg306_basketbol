import Card from "../ui/Cards";

export default function PlayerCard({ player }) {
  // Generate mock stats for Free Tier
  const generateMockStats = (player) => {
    const baseStats = {
      pts: Math.floor(Math.random() * 30) + 15, // 15-45 points
      reb: (Math.random() * 15 + 5).toFixed(1), // 5-20 rebounds
      ast: (Math.random() * 10 + 3).toFixed(1), // 3-13 assists
      fg_pct: Math.random() * 0.3 + 0.45, // 45-75% FG
    };
    return baseStats;
  };

  const mockStats = generateMockStats(player);

  return (
    <Card hover className="p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
        {player.first_name?.[0]}
        {player.last_name?.[0]}
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
          <div className="font-bold text-blue-500">{mockStats.pts}</div>
          <div className="text-gray-400">PPG</div>
        </div>
        <div>
          <div className="font-bold text-purple-500">{mockStats.reb}</div>
          <div className="text-gray-400">RPG</div>
        </div>
        <div>
          <div className="font-bold text-orange-500">{mockStats.ast}</div>
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
    </Card>
  );
}
