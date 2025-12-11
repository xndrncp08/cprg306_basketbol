import Link from "next/link";

export default function PlayerCard({ player }) {
  return (
    <Link href={`/players/${player.id}`}>
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer h-full flex flex-col group">
        {/* Player Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {player.first_name?.[0]}
            {player.last_name?.[0]}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {player.first_name} {player.last_name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              {player.position && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {player.position}
                </span>
              )}
              <span className="text-gray-600 text-sm font-medium">
                {player.team?.abbreviation || "FA"}
              </span>
            </div>
          </div>
        </div>

        {/* Player Details */}
        <div className="border-t border-gray-100 pt-5 mb-6 flex-1">
          <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
            <span className="text-gray-500 text-sm">Team</span>
            <span className="text-gray-900 font-medium">
              {player.team?.full_name || "Free Agent"}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
            <span className="text-gray-500 text-sm">Height</span>
            <span className="text-gray-900 font-medium">
              {player.height || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
            <span className="text-gray-500 text-sm">Weight</span>
            <span className="text-gray-900 font-medium">
              {player.weight ? `${player.weight} lbs` : "N/A"}
            </span>
          </div>
        </div>

        {/* View Button */}
        <div className="text-blue-600 font-semibold flex items-center justify-center p-3 border-2 border-gray-200 rounded-xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
          View Stats →
        </div>
      </div>
    </Link>
  );
}
