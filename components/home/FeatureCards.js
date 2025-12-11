import { FaFire, FaTrophy, FaUsers, FaNewspaper } from "react-icons/fa";
import Card from "../ui/Cards";

export default function FeatureCards({ stats = {} }) {
  const features = [
    {
      icon: <FaFire />,
      title: "Live Scores",
      desc: `${stats.games || 0} games today`,
      stat: stats.games || 0,
      color: "from-red-500 to-orange-500",
    },
    {
      icon: <FaTrophy />,
      title: "Standings",
      desc: "Conference rankings",
      stat: "30 teams",
      color: "from-yellow-500 to-green-500",
    },
    {
      icon: <FaUsers />,
      title: "Players",
      desc: `${stats.players || 0} featured`,
      stat: stats.players || 0,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaNewspaper />,
      title: "News",
      desc: `${stats.news || 0} articles`,
      stat: stats.news || 0,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {features.map((feature, index) => (
        <Card key={index} hover className="p-6 text-center">
          <div
            className={`text-4xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
          >
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{feature.desc}</p>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {feature.stat}
          </div>
        </Card>
      ))}
    </div>
  );
}
