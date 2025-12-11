export default async function TestPage() {
  const apiKey = process.env.BALLDONTLIE_API_KEY;
  
  // Simple fetch to test API
  const response = await fetch('https://api.balldontlie.io/v1/players?per_page=10', {
    headers: { 'Authorization': apiKey }
  });
  
  const data = await response.json();
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        🏀 NBA Players Test
      </h1>
      
      <div style={{ 
        padding: '10px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <p><strong>API Status:</strong> ✅ Connected</p>
        <p><strong>Players Loaded:</strong> {data.data.length}</p>
      </div>
      
      <div style={{ display: 'grid', gap: '10px' }}>
        {data.data.map(player => (
          <div 
            key={player.id}
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <h3 style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
              {player.first_name} {player.last_name}
            </h3>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#666' }}>
              <span>Position: {player.position || 'N/A'}</span>
              <span>|</span>
              <span>Team: {player.team?.full_name || 'No team'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}