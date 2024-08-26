import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export async function POST(request) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Connect to the database
    await client.connect();

    // Parse JSON from the request
    const { ldr, temp, raindrop_status, vibration_status } = await request.json();

    // Ensure data types are correct before inserting into the database
    const ldrParsed = parseFloat(ldr);           // Light-dependent resistor value (Lux)
    const tempParsed = parseFloat(temp);         // Temperature sensor value
    const raindropStatusParsed = raindrop_status === "Raindrop Detected" ? true : false; // Boolean
    const vibrationStatusParsed = vibration_status === "Vibration detected!" ? true : false; // Boolean

    // Execute SQL query to insert data
    const res = await client.query(
      'INSERT INTO "NRD012" (ldr, temperature, raindrop_status, vibration_status) VALUES ($1, $2, $3, $4) RETURNING *',
      [ldrParsed, tempParsed, raindropStatusParsed, vibrationStatusParsed]
    );

    // Return successful response
    return new Response(JSON.stringify(res.rows[0]), {
      status: 201,
      headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json' 
      },
    });
  } catch (error) {
    // Log and return error response
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json' 
      },
    });
  } finally {
    // Close the database connection
    await client.end();
  }
}
