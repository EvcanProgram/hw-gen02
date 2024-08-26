import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the database once
client.connect();

export const dynamic = 'force-dynamic';


// src/app/api/route.js
// -------------------------------------------------------------------------------------
export async function GET() {
  try {
    const result = await client.query('SELECT * FROM "PHUW022"');
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('GET Error:', error.stack || error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request) {
  try {
    // const body = await request.json();
    // console.log(body);
    // Parse JSON from the request
    const { lux, temperature, raindrop_status, raindrop_value, vibration_status } = await request.json();
    
    // Ensure data types are correct
    const luxParsed = parseFloat(lux);
    const temperatureParsed = parseFloat(temperature);
    const raindropStatusParsed = String(raindrop_status);
    const raindropValueParsed = parseFloat(raindrop_value)
    const vibrationStatusParsed = String(vibration_status);

    // Execute SQL query to insert data
    const res = await client.query(
      'INSERT INTO "PHUW022" (lux, temperature, raindrop_status, raindrop_value ,vibration_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [luxParsed, temperatureParsed, raindropStatusParsed, raindropValueParsed, vibrationStatusParsed]
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