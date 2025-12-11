import { FaUsers, FaBasketballBall, FaNewspaper, FaTrophy, FaChartLine } from 'react-icons/fa';

function PageHeader({ 
  title, 
  subtitle, 
  icon = FaUsers, 
  gradient = "from-blue-500 via-purple-600 to-orange-500" 
}) {
  const Icon = icon;
  
  return (
    <div className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            <Icon className="text-white text-3xl" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </h1>
          {subtitle && <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function SearchBar({ placeholder = "Search..." }) {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={placeholder}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option className="bg-gray-800">All</option>
            </select>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              <FaFilter />
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, actionText, actionHref, gradient = "from-blue-500 to-purple-600" }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold">
        <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {title}
        </span>
      </h2>
      {actionText && actionHref && (
        <a href={actionHref} className="text-blue-400 hover:text-blue-300 text-sm">
          {actionText} →
        </a>
      )}
    </div>
  );
}

function Pagination({ currentPage, totalPages, baseUrl = "/players" }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12 pt-8 border-t border-gray-700">
      <div className="text-gray-400 text-sm">
        Page {currentPage} of {totalPages}
      </div>
      
      <div className="flex items-center gap-4">
        <a 
          href={`${baseUrl}?page=${Math.max(1, currentPage - 1)}`}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            currentPage <= 1 
              ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed pointer-events-none' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white'
          }`}
        >
          <FaArrowLeft />
          Previous
        </a>
        
        <div className="flex items-center gap-2">
          {[currentPage - 1, currentPage, currentPage + 1]
            .filter(page => page > 0 && page <= totalPages)
            .map(page => (
              <a
                key={page}
                href={`${baseUrl}?page=${page}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-all ${
                  page === currentPage
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {page}
              </a>
            ))}
        </div>
        
        <a 
          href={`${baseUrl}?page=${Math.min(totalPages, currentPage + 1)}`}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:opacity-90 transition-all duration-300"
        >
          Next
          <FaArrowRight />
        </a>
      </div>
    </div>
  );
}

export { PageHeader, SearchBar, SectionHeader, Pagination };