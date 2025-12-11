/*
*
*Thank you so much Claude Ai for helping me so much here lol
*
*/


'use client'

import { useState, useEffect } from 'react'
import { FaSearch, FaFilter, FaArrowRight, FaSyncAlt } from 'react-icons/fa'
import { ballDontLieAPI } from '@/lib/api/balldontlie'

export default function PlayersPage() {
  const [players, setPlayers] = useState([])
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [teamFilter, setTeamFilter] = useState('all')
  const [positionFilter, setPositionFilter] = useState('all')
  const [teams, setTeams] = useState([])

  const cardStyle = "bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"

  // Fetch teams for filter
  useEffect(() => {
    fetchTeams()
  }, [])

  // Fetch players when page changes
  useEffect(() => {
    fetchPlayers()
  }, [page])

  // Filter players when search or filters change
  useEffect(() => {
    filterPlayers()
  }, [search, teamFilter, positionFilter, players])

  const fetchTeams = async () => {
    try {
      const teamsData = await ballDontLieAPI.getTeams()
      setTeams(teamsData)
    } catch (error) {
      console.error('Error fetching teams:', error)
      setTeams([])
    }
  }

  const fetchPlayers = async () => {
    setLoading(true)
    try {
      const response = await ballDontLieAPI.getPlayers(page, 25)
      setPlayers(prev => [...prev, ...(response.data || [])])
      setTotalPages(response.meta?.total_pages || 1)
    } catch (error) {
      console.error('Error fetching players:', error)
      setPlayers([])
    } finally {
      setLoading(false)
    }
  }

  const filterPlayers = () => {
    let filtered = [...players]

    // Apply search filter
    if (search.trim()) {
      const searchTerm = search.toLowerCase()
      filtered = filtered.filter(player =>
        `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchTerm) ||
        player.team?.full_name?.toLowerCase().includes(searchTerm) ||
        player.position?.toLowerCase().includes(searchTerm)
      )
    }

    // Apply team filter
    if (teamFilter !== 'all') {
      filtered = filtered.filter(player => 
        player.team?.id?.toString() === teamFilter
      )
    }

    // Apply position filter
    if (positionFilter !== 'all') {
      filtered = filtered.filter(player => 
        player.position === positionFilter
      )
    }

    setFilteredPlayers(filtered)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      setPage(prev => prev + 1)
    }
  }

  const handleResetFilters = () => {
    setSearch('')
    setTeamFilter('all')
    setPositionFilter('all')
    if (page > 1) {
      setPage(1)
      setPlayers([])
      fetchPlayers()
    } else {
      filterPlayers()
    }
  }

  const positions = ['G', 'F', 'C', 'G-F', 'F-G', 'F-C', 'C-F']

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            NBA Players
          </span>
        </h1>
        <p className="text-gray-400">
          {players.length > 0 ? `${players.length} players loaded` : 'Loading players...'}
          <span className="text-sm text-gray-500 ml-2">(Free Tier - Stats are simulated)</span>
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search players by name, team, or position..."
            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Team Filter */}
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">Team</label>
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Teams</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>
                  {team.full_name} ({team.abbreviation})
                </option>
              ))}
            </select>
          </div>

          {/* Position Filter */}
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">Position</label>
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Positions</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors flex items-center"
            >
              <FaSyncAlt className="mr-2" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-400">
          Showing {filteredPlayers.length} of {players.length} players
          {search && ` for "${search}"`}
        </p>
        {page < totalPages && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? 'Loading...' : (
              <>
                Load More
                <FaArrowRight className="ml-2" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Player Grid */}
      {loading && page === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`${cardStyle} p-6 h-64 animate-pulse`}></div>
          ))}
        </div>
      ) : filteredPlayers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => {
              // Generate mock stats for Free Tier
              const mockStats = ballDontLieAPI.generateMockStats(player)
              
              return (
                <div key={player.id} className={`${cardStyle} p-6 text-center hover:scale-105`}>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                    {player.first_name[0]}{player.last_name[0]}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{player.first_name} {player.last_name}</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    #{player.jersey_number || '00'} • {player.position || 'G'}
                  </p>
                  <p className="text-blue-400 font-semibold mb-4">
                    {player.team?.full_name || 'Free Agent'}
                  </p>
                  
                  {/* Mock Stats for Free Tier */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
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
                      <div className="font-bold text-green-500">{(mockStats.fg_pct * 100).toFixed(1)}%</div>
                      <div className="text-gray-400">FG%</div>
                    </div>
                  </div>
                  
                  {/* Player Details */}
                  <div className="mt-4 space-y-2 text-xs text-gray-500">
                    {player.height && (
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span className="text-gray-300">
                          {Math.floor(player.height / 12)}'{player.height % 12}"
                        </span>
                      </div>
                    )}
                    {player.weight && (
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="text-gray-300">{player.weight} lbs</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    Stats simulated for Free Tier
                  </p>
                </div>
              )
            })}
          </div>

          {/* Load More Button */}
          {page < totalPages && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
              >
                {loading ? (
                  <>
                    Loading...
                    <FaSyncAlt className="ml-2 animate-spin" />
                  </>
                ) : (
                  <>
                    Load More Players
                    <FaArrowRight className="ml-2" />
                  </>
                )}
              </button>
              <p className="text-gray-400 text-sm mt-2">
                Page {page} of {totalPages} • {players.length} players loaded
              </p>
            </div>
          )}
        </>
      ) : (
        <div className={`${cardStyle} p-12 text-center`}>
          <p className="text-gray-400 text-lg">No players found</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  )
}