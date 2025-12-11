import { PlayerCard, FeatureCard, StatCard, QuickLinkCard } from "./Cards";

function FeatureGrid({ features }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
}

function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

function PlayersGrid({ players, showStats = true }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} showStats={showStats} />
      ))}
    </div>
  );
}

function QuickLinksGrid({ links }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {links.map((link, index) => (
        <QuickLinkCard key={index} {...link} />
      ))}
    </div>
  );
}

function ResponsiveGrid({ children, cols = { sm: 1, md: 2, lg: 3 } }) {
  const gridClass = `grid grid-cols-${cols.sm} sm:grid-cols-${cols.md} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg} gap-6`;

  return <div className={gridClass}>{children}</div>;
}

export { FeatureGrid, StatsGrid, PlayersGrid, QuickLinksGrid, ResponsiveGrid };
