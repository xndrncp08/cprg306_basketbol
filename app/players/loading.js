export default function PlayersLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-10 w-64 bg-gray-800 rounded mb-2"></div>
        <div className="h-4 w-48 bg-gray-800 rounded"></div>
      </div>
      
      {/* Search Bar Skeleton */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 h-12 bg-gray-800 rounded-lg"></div>
        <div className="w-48 h-12 bg-gray-800 rounded-lg"></div>
      </div>
      
      {/* Players Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-6 w-32 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}