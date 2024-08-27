import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export const dynamic = 'force-dynamic';

client.connect();

export async function GET() {
  try {
    const result = await client.query(`SELECT * 
    FROM "PHUW022"
    ORDER BY "timestamp" DESC
    LIMIT 1`);
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', "Content-Type": "application/json" },
    });
  }
}
