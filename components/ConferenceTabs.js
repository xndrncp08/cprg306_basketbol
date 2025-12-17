/**
 *
 * This component provides tab controls for switching between Eastern and
 * Western conference standings. It highlights the active tab and triggers
 * state updates when the selected conference changes, allowing parent
 * components to update displayed data accordingly.
 */


const ConferenceTabs = ({
  conference,
  setConference,
  easternCount,
  westernCount,
}) => {
  const tabs = [
    { id: "eastern", name: "Eastern Conference", count: easternCount || 15 },
    { id: "western", name: "Western Conference", count: westernCount || 15 },
  ];

  return (
    <div className="flex mb-8 border-b border-gray-800">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setConference(tab.id)}
          className={`px-6 py-4 font-semibold text-lg flex items-center border-b-2 transition-all ${
            conference === tab.id
              ? "border-blue-500 text-blue-500 bg-blue-500/5"
              : "border-transparent text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          {tab.name}
          <span className="ml-2 text-sm px-2 py-1 rounded bg-gray-800">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ConferenceTabs;
