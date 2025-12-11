import { FaChevronUp, FaChevronDown, FaMinus } from 'react-icons/fa'

export default function StandingsTable({ standings, conference, loading }) {
  if (loading) {
    return (
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded"></div>
          {[...Array(15)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  const getPlayoffColor = (rank) => {
    if (rank <= 6) return 'border-l-4 border-l-green-500 bg-green-500/10'
    if (rank <= 10) return 'border-l-4 border-l-yellow-500 bg-yellow-500/10'
    return 'border-l-4 border-l-gray-600 bg-gray-800/30'
  }

  const getStreakColor = (streak) => {
    if (!streak) return 'bg-gray-500/20 text-gray-400'
    if (streak.startsWith('W')) return 'bg-green-500/20 text-green-400'
    if (streak.startsWith('L')) return 'bg-red-500/20 text-red-400'
    return 'bg-gray-500/20 text-gray-400'
  }

  const getTrendIcon = (rank) => {
    if (rank <= 3) return <FaChevronUp className="text-green-400 text-sm" />
    if (rank >= 13) return <FaChevronDown className="text-red-400 text-sm" />
    return <FaMinus className="text-gray-400 text-sm" />
  }

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/80">
            <tr>
              <th className="py-4 px-4 text-left font-semibold text-gray-300">Rank</th>
              <th className="py-4 px-4 text-left font-semibold text-gray-300">Team</th>
              <th className="py-4 px-4 text-center font-semibold text-gray-300">W-L</th>
              <th className="py-4 px-4 text-center font-semibold text-gray-300">PCT</th>
              <th className="py-4 px-4 text-center font-semibold text-gray-300">GB</th>
              <th className="py-4 px-4 text-center font-semibold text-gray-300">Home</th>
              <th className="py-4 px-4 text-center font-semibold text-gray-300">Road</th>
              <th className="py-4 px-4 text-center font-semibold text-gray-300">Last 10</th>
              <th className="py-4 px-4 text-center font-semibold text-gray-300">Streak</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr
                key={`${conference}-${team.rank}`}
                className={`border-t border-gray-800/50 hover:bg-gray-800/30 transition-colors ${getPlayoffColor(team.rank)}`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                      team.rank <= 6 ? 'bg-green-500/20 text-green-400' :
                      team.rank <= 10 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-700 text-gray-400'
                    }`}>
                      {team.rank}
                    </span>
                    {getTrendIcon(team.rank)}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mr-3 border border-gray-600">
                      <span className="font-bold text-sm">{team.abbreviation}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{team.team}</div>
                      <div className="text-xs text-gray-400">{team.abbreviation}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-bold text-lg">
                    <span className="text-green-400">{team.wins}</span>
                    <span className="text-gray-500 mx-1">-</span>
                    <span className="text-red-400">{team.losses}</span>
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-semibold text-white">
                    {typeof team.winPercentage === 'number' 
                      ? team.winPercentage.toFixed(3) 
                      : team.winPercentage || '0.000'}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-gray-300">
                    {team.gamesBehind === 0 || team.gamesBehind === '0' ? '-' : team.gamesBehind}
                  </span>
                </td>
                <td className="py-4 px-4 text-center text-sm">
                  <span className="text-green-400">{team.homeRecord}</span>
                </td>
                <td className="py-4 px-4 text-center text-sm">
                  <span className="text-blue-400">{team.awayRecord}</span>
                </td>
                <td className="py-4 px-4 text-center text-sm">
                  <span className="text-gray-300">{team.last10}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStreakColor(team.streak)}`}>
                    {team.streak || '-'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}