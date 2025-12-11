import { PageHeader, SearchBar, StatsGrid, PlayersGrid, Pagination } from '@/components/ui/Layout';

async function getPlayers(page = 1) {
  const apiKey = process.env.BALLDONTLIE_API_KEY;
  
  try {
    const res = await fetch(`https://api.balldontlie.io/v1/players?page=${page}&per_page=12`, {
      headers: { 'Authorization': apiKey },
      cache: 'no-store'
    });
    
    if (!res.ok) return { data: [], meta: { total_count: 0 } };
    return await res.json();
  } catch (error) {
    return { data: [], meta: { total_count: 0 } };
  }
}

export default async function PlayersPage({ searchParams }) {
  const params = await searchParams;
  const currentPage = parseInt(params?.page) || 1;
  
  const data = await getPlayers(currentPage);
  const players = data.data || [];
  const totalPages = Math.ceil((data.meta?.total_count || 0) / 12);

  const stats = [
    { label: 'Players on Page', value: players.length, color: 'from-blue-500 to-cyan-500' },
    { label: 'Current Page', value: currentPage, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Pages', value: totalPages, color: 'from-orange-500 to-red-500' },
    { label: 'Database Total', value: data.meta?.total_count || 0, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="NBA Players" 
        subtitle="Explore detailed stats and profiles of every NBA player"
      />
      
      <SearchBar placeholder="Search players by name..." />
      
      <div className="container mx-auto px-4 mb-12">
        <StatsGrid stats={stats} />
      </div>

      <div className="container mx-auto px-4 pb-16">
        {players.length > 0 ? (
          <>
            <PlayersGrid players={players} />
            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/players" />
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🏀</div>
            <h3 className="text-2xl font-bold text-white mb-3">No Players Found</h3>
            <p className="text-gray-400">Try adjusting your search or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}