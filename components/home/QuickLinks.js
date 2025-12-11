import Card from "../ui/Cards";

export default function QuickLinks() {
  const links = [
    {
      title: "All Players",
      href: "/players",
      desc: "Browse all NBA players",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Standings",
      href: "/standings",
      desc: "Conference rankings",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Schedule",
      href: "/scores",
      desc: "Game schedule & scores",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Player Compare",
      href: "/compare",
      desc: "Compare player stats",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.href}
            className="block"
          >
            <Card 
              hover 
              className="p-8 text-center bg-gradient-to-br bg-opacity-10 hover:bg-opacity-20"
            >
              <div className={`bg-gradient-to-br ${link.color} bg-clip-text text-transparent`}>
                <h3 className="text-xl font-bold mb-2">{link.title}</h3>
                <p className="text-gray-300">{link.desc}</p>
                <div className="mt-4 text-blue-400">Explore →</div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}