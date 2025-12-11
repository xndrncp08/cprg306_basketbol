import Link from "next/link";

async function getPlayerData(id) {
  const apiKey = process.env.BALLDONTLIE_API_KEY;

  if (!id) {
    console.error("No player ID provided");
    return null;
  }

  try {
    // Fetch player details
    const playerRes = await fetch(
      `https://api.balldontlie.io/v1/players/${id}`,
      {
        headers: { Authorization: apiKey },
        next: { revalidate: 3600 },
      }
    );

    if (!playerRes.ok) {
      console.error("Player fetch failed:", playerRes.status);
      return null;
    }

    const player = await playerRes.json();

    // Try to get stats
    let stats = null;
    try {
      const statsRes = await fetch(
        `https://api.balldontlie.io/v1/season_averages?player_ids[]=${id}&season=2023`,
        {
          headers: { Authorization: apiKey },
        }
      );

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        stats = statsData.data[0] || null;
      }
    } catch (statsError) {
      console.log("No stats available for player");
    }

    return { player, stats };
  } catch (error) {
    console.error("Error fetching player data:", error);
    return null;
  }
}

// ✅ FIXED: Await the params Promise
export default async function PlayerDetailPage({ params }) {
  // Await the params Promise first
  const routeParams = await params;
  const id = routeParams?.id;

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Player Not Found</h1>
          <p className="text-gray-400 mb-6">No player ID specified.</p>
          <Link
            href="/players"
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  const data = await getPlayerData(id);

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Player Not Found</h1>
          <p className="text-gray-400 mb-6">
            Could not find player with ID: {id}
          </p>
          <Link
            href="/players"
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  const { player, stats } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/players"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Players
        </Link>
      </div>

      {/* Player Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 mb-8 border border-gray-700">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Player Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              {player.first_name?.[0]}
              {player.last_name?.[0]}
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gray-900 rounded-full border-4 border-gray-800 flex items-center justify-center">
              <span className="text-lg font-bold">
                #{player.jersey_number || "00"}
              </span>
            </div>
          </div>

          {/* Player Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-2">
              {player.first_name}{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {player.last_name}
              </span>
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
              <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-lg">
                {player.position || "N/A"}
              </span>
              <span className="text-2xl font-bold">
                {player.team?.abbreviation || "FA"}
              </span>
              <span className="text-gray-400">
                {player.team?.full_name || "Free Agent"}
              </span>
            </div>

            {/* Physical Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Height</div>
                <div className="text-xl font-bold">
                  {player.height || "N/A"}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Weight</div>
                <div className="text-xl font-bold">
                  {player.weight ? `${player.weight} lbs` : "N/A"}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">College</div>
                <div className="text-xl font-bold">
                  {player.college || "N/A"}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Country</div>
                <div className="text-xl font-bold">
                  {player.country || "USA"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {stats ? (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Season Averages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: "PPG", value: stats.pts || "0.0" },
              { label: "REB", value: stats.reb || "0.0" },
              { label: "AST", value: stats.ast || "0.0" },
              { label: "STL", value: stats.stl || "0.0" },
              { label: "BLK", value: stats.blk || "0.0" },
              {
                label: "FG%",
                value: stats.fg_pct
                  ? (stats.fg_pct * 100).toFixed(1) + "%"
                  : "0.0%",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-12 text-center py-8 bg-gray-800/50 rounded-xl">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-2">No Stats Available</h3>
          <p className="text-gray-400">
            This player doesn't have recorded stats for the current season.
          </p>
        </div>
      )}
    </div>
  );
}
