export async function POST(request) {
  try {
    const { lux, temperature, raindrop_status, vibration_status } = await request.json();
    
    // Ensure data types are correct
    const luxParsed = parseFloat(lux);
    const temperatureParsed = parseFloat(temperature);
    const raindropStatusParsed = String(raindrop_status);
    const vibrationStatusParsed = String(vibration_status);

    // Execute SQL query to insert data
    const res = await client.query(
      'INSERT INTO "PHUW022" (lux, temperature, raindrop_status, vibration_status) VALUES ($1, $2, $3, $4) RETURNING *',
      [luxParsed, temperatureParsed, raindropStatusParsed, vibrationStatusParsed]
    );

    // Return successful response
    return new Response(JSON.stringify(res.rows[0]), {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('POST Error:', error.stack || error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }
}
