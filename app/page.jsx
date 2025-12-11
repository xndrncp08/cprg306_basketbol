'use client'

import { useState, useEffect } from 'react'
import { FaBasketballBall, FaFire, FaTrophy, FaUsers, FaChartLine } from 'react-icons/fa'
import { espnAPI } from '@/lib/api/espn'
import { ballDontLieAPI } from '@/lib/api/balldontlie'

export default function HomePage() {
  const [games, setGames] = useState([])
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const [gamesData, playersData] = await Promise.all([
        espnAPI.getScoreboard(today),
        ballDontLieAPI.getPlayers(1, 8)
      ])
      
      setGames(gamesData.events || [])
      setPlayers(playersData.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Basketbol</span>
              <br />
              <span className="text-white">NBA 2K Inspired</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience NBA statistics like never before with our immersive 2K-style interface
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <FaFire />, title: 'Live Scores', desc: 'Real-time game updates' },
              { icon: <FaTrophy />, title: 'Standings', desc: 'Conference rankings' },
              { icon: <FaUsers />, title: 'Players', desc: 'Detailed stats & profiles' },
              { icon: <FaChartLine />, title: 'Compare', desc: 'Player matchups' },
            ].map((feature, index) => (
              <div key={index} className="card-2k p-6 text-center hover:scale-105 transition-transform">
                <div className="text-4xl text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Games */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <FaBasketballBall className="mr-3 text-primary" />
          <span className="text-gradient">Today's Games</span>
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-2k p-6 h-40 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(0, 6).map((game) => (
              <div key={game.id} className="card-2k p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-400">
                    {new Date(game.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    game.status.type.state === 'in' ? 'bg-red-500/20 text-red-400' :
                    game.status.type.state === 'post' ? 'bg-green-500/20 text-green-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {game.status.type.state === 'in' ? 'LIVE' : 
                     game.status.type.state === 'post' ? 'FINAL' : 'UPCOMING'}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {game.competitions[0].competitors.map((team, idx) => (
                    <div key={team.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                          <span className="font-bold">{team.team.abbreviation}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{team.team.displayName}</div>
                          <div className="text-sm text-gray-400">{team.records?.[0]?.summary || '0-0'}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">{team.score || '-'}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Players */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">
          <span className="text-gradient">Featured Players</span>
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card-2k p-6 h-48 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {players.slice(0, 8).map((player) => (
              <div key={player.id} className="card-2k p-6 text-center glow-effect group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  {player.first_name[0]}{player.last_name[0]}
                </div>
                <h3 className="font-bold text-lg mb-1">{player.first_name} {player.last_name}</h3>
                <p className="text-gray-400 text-sm mb-3">
                  #{player.jersey_number || '00'} • {player.position || 'G'}
                </p>
                <p className="text-primary font-semibold">
                  {player.team?.full_name || 'Free Agent'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: 'All Players', href: '/players', color: 'from-blue-500 to-cyan-500' },
            { title: 'Standings', href: '/standings', color: 'from-green-500 to-emerald-500' },
            { title: 'Schedule', href: '/scores', color: 'from-orange-500 to-red-500' },
            { title: 'News', href: '/news', color: 'from-purple-500 to-pink-500' },
          ].map((link) => (
            <a
              key={link.title}
              href={link.href}
              className={`card-2k p-8 text-center hover:scale-105 transition-transform bg-gradient-to-br ${link.color} bg-opacity-10 hover:bg-opacity-20`}
            >
              <h3 className="text-xl font-bold">{link.title}</h3>
              <p className="text-gray-300 mt-2">Click to explore →</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}