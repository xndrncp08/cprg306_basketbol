export default function HeroSection({ 
  games = 0, 
  players = 0, 
  news = 0 
}) {
  return (
    <div className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              Basketbol
            </span>
            <br />
            <span className="text-white">NBA 2K Inspired Stats</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time NBA statistics
          </p>
          <p className="text-sm text-gray-400 mt-4">
            By Xander Rancap
          </p>
        </div>
      </div>
    </div>
  );
}