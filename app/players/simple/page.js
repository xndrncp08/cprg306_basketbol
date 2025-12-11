export default async function SimpleTest() {
  const apiKey = process.env.BALLDONTLIE_API_KEY;
  
  const res = await fetch('https://api.balldontlie.io/v1/players?per_page=5', {
    headers: { 'Authorization': apiKey }
  });
  
  const data = await res.json();
  
  return (
    <div>
      <h1>NBA API Test</h1>
      <p>Status: {res.ok ? '✅ OK' : '❌ Error'}</p>
      <p>Players loaded: {data.data.length}</p>
      
      <ul>
        {data.data.map(player => (
          <li key={player.id}>
            {player.first_name} {player.last_name} - {player.team?.abbreviation || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}