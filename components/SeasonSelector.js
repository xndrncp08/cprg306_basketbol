/**
 *
 * This component provides a dropdown menu for selecting an NBA season. It
 * highlights the currently selected season and notifies parent components
 * when the selection changes, allowing standings data to update dynamically.
 */


const SeasonSelector = ({ season, setSeason }) => {
  const seasons = [
    { id: '2024', label: 'Current' },
    { id: '2023', label: '2022-2023' },
    { id: '2022', label: '2021-2022' },
    { id: '2021', label: '2020-2021' },
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-400 mb-2">Select Season:</label>
      <div className="flex gap-2">
        {seasons.map((s) => (
          <button
            key={s.id}
            onClick={() => setSeason(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              season === s.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeasonSelector;