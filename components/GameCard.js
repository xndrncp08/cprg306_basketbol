/**
 *
 * This component renders information for a single NBA game. It receives a
 * game object and displays team details, scores, and game status. The card
 * dynamically updates its visuals based on whether the game is live, final,
 * or upcoming, including period and clock information for live games.
 */


import { formatGameTime, getTeamAbbreviation } from "@/lib/utils/formatters";

const GameCard = ({ game }) => {
  const competition = game.competitions?.[0];
  const competitors = competition?.competitors || [];
  const homeTeam = competitors.find((c) => c.homeAway === "home");
  const awayTeam = competitors.find((c) => c.homeAway === "away");
  const status = game.status?.type?.state || "unknown";

  const cardStyle =
    "bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300";

  return (
    <div className={cardStyle}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-400">
            {game.date ? formatGameTime(game.date) : "TBD"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              status === "in"
                ? "bg-purple-500/20 text-purple-400 animate-pulse"
                : status === "post"
                ? "bg-green-500/20 text-green-400"
                : "bg-gray-500/20 text-gray-400"
            }`}
          >
            {status === "in"
              ? "LIVE"
              : status === "post"
              ? "FINAL"
              : "UPCOMING"}
          </span>
        </div>

        <div className="space-y-4">
          {[awayTeam, homeTeam].map((team, idx) => {
            if (!team) return null;
            return (
              <div
                key={team.id || idx}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                    <span className="font-bold">
                      {getTeamAbbreviation(team.team?.displayName) ||
                        team.team?.abbreviation ||
                        "TBD"}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">
                      {team.team?.displayName || "Unknown Team"}
                    </div>
                    <div className="text-sm text-gray-400">
                      ({team.records?.[0]?.summary || "0-0"})
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {team.score !== undefined ? team.score : "-"}
                </div>
              </div>
            );
          })}
        </div>

        {status === "in" && competition?.status && (
          <div className="mt-4 pt-4 border-t border-gray-700 text-center">
            <div className="text-sm text-gray-300">
              {competition.status.period ? `Q${competition.status.period}` : ""}
              {competition.status.displayClock
                ? ` • ${competition.status.displayClock}`
                : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
