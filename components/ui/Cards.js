import { FaArrowRight, FaBasketballBall, FaUsers, FaFire, FaTrophy, FaNewspaper, FaChartLine, FaSearch, FaFilter, FaArrowLeft } from 'react-icons/fa';

function Card({ 
  children, 
  className = "", 
  hover = false, 
  padding = "p-6",
  onClick 
}) {
  const baseClasses = "bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg shadow-black/50 transition-all duration-300";
  const hoverClasses = hover ? "hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105" : "";
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${padding} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function FeatureCard({ icon, title, desc, stat, color = "from-blue-500 to-purple-600" }) {
  const Icon = icon;
  
  return (
    <Card hover className="p-6 text-center">
      <div className={`text-4xl mb-4 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        <Icon />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-2">{desc}</p>
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        {stat}
      </div>
    </Card>
  );
}

function StatCard({ label, value, color = "from-blue-500 to-purple-600", icon }) {
  return (
    <Card className="p-6 text-center">
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}>
        {value}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </Card>
  );
}

function QuickLinkCard({ title, href, desc, color = "from-blue-500 to-cyan-500" }) {
  return (
    <a href={href} className="block">
      <Card hover className="p-8 text-center bg-gradient-to-br bg-opacity-10 hover:bg-opacity-20">
        <div className={`bg-gradient-to-br ${color} bg-clip-text text-transparent`}>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300">{desc}</p>
          <div className="mt-4 text-blue-400">Explore →</div>
        </div>
      </Card>
    </a>
  );
}

function PlayerCard({ player, showStats = true }) {
  const mockStats = {
    pts: Math.floor(Math.random() * 30) + 15,
    reb: (Math.random() * 15 + 5).toFixed(1),
    ast: (Math.random() * 10 + 3).toFixed(1),
    fg_pct: Math.random() * 0.3 + 0.45,
  };

  return (
    <a href={`/players/${player.id}`}>
      <Card hover className="h-full flex flex-col">
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {player.first_name?.[0]}{player.last_name?.[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {player.first_name} {player.last_name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  {player.position && (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                      {player.position}
                    </span>
                  )}
                  <span className="text-gray-400 text-sm">#{player.jersey_number || '00'}</span>
                </div>
              </div>
            </div>
            <FaBasketballBall className="text-4xl opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <p className="text-blue-400 font-semibold">
            {player.team?.full_name || 'Free Agent'}
          </p>
        </div>
        
        {showStats && (
          <div className="px-6 py-4 bg-gray-900/30 border-y border-gray-700/50">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: mockStats.pts, label: 'PPG', color: 'from-blue-500 to-cyan-500' },
                { value: mockStats.reb, label: 'RPG', color: 'from-purple-500 to-pink-500' },
                { value: mockStats.ast, label: 'APG', color: 'from-orange-500 to-red-500' },
                { value: `${(mockStats.fg_pct * 100).toFixed(1)}%`, label: 'FG%', color: 'from-green-500 to-emerald-500' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="p-6 pt-4 flex-1">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
              <span className="text-gray-400">Height</span>
              <span className="text-white">{player.height || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Weight</span>
              <span className="text-white">{player.weight ? `${player.weight} lbs` : 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <span>View Profile</span>
            <FaArrowRight />
          </div>
        </div>
      </Card>
    </a>
  );
}

function LoadingCard({ className = "", height = "h-40" }) {
  return (
    <div className={`${className} bg-gray-800/50 rounded-xl border border-gray-700 animate-pulse ${height}`}></div>
  );
}

export { Card, FeatureCard, StatCard, QuickLinkCard, PlayerCard, LoadingCard };