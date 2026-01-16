/**
 *
 * This component displays an individual player’s information along with mock
 * performance statistics. Player data is passed in as props, and mock stats
 * are generated based on the player’s position to simulate real data. The
 * card presents the player’s name, team, position, and key stats in a
 * consistent visual layout.
 */


import { ballDontLieAPI } from "@/lib/api/balldontlie";

const PlayerCard = ({ player, detailed = false }) => {
  const mockStats = ballDontLieAPI.generateMockStats(player);
  const cardStyle =
    "bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300";

  return (
    <div
      className={`${cardStyle} p-6 text-center hover:scale-105 transition-transform`}
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
        {player.first_name[0]}
        {player.last_name[0]}
      </div>
      <h3 className="font-bold text-lg mb-1">
        {player.first_name} {player.last_name}
      </h3>
      <p className="text-gray-400 text-sm mb-3">
        #{player.jersey_number || "00"} • {player.position || "G"}
      </p>
      <p className="text-rose-400 font-semibold mb-4">
        {player.team?.full_name || "Free Agent"}
      </p>

      <div className="grid grid-cols-2 gap-2 text-sm mt-4">
        <div>
          <div className="font-bold text-purple-500">{mockStats.pts}</div>
          <div className="text-gray-400">PPG</div>
        </div>
        <div>
          <div className="font-bold text-purple-500">{mockStats.reb}</div>
          <div className="text-gray-400">RPG</div>
        </div>
        <div>
          <div className="font-bold text-purple-500">{mockStats.ast}</div>
          <div className="text-gray-400">APG</div>
        </div>
        <div>
          <div className="font-bold text-purple-500">
            {(mockStats.fg_pct * 100).toFixed(1)}%
          </div>
          <div className="text-gray-400">FG%</div>
        </div>
      </div>

      {detailed && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="text-gray-400">STL</div>
              <div className="font-bold">{mockStats.stl}</div>
            </div>
            <div>
              <div className="text-gray-400">BLK</div>
              <div className="font-bold">{mockStats.blk}</div>
            </div>
            <div>
              <div className="text-gray-400">MIN</div>
              <div className="font-bold">{mockStats.min}</div>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-3">
        Stats are simulated for Free Tier
      </p>
    </div>
  );
};

export default PlayerCard;
