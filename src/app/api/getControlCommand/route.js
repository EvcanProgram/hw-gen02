// src/app/api/ledControl/route.js
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export async function POST(request) {
  try {
    const { command } = await request.json();

    // Validate the command
    if (command !== 'RED_ON' && command !== 'GREEN_ON' && command !== 'BLUE_ON' && command !== 'OFF') {
      throw new Error('Invalid command');
    }

    // Update the command in the database
    const res = await client.query(
      'UPDATE "PHUW022" SET command = $1 WHERE id = $2 RETURNING *',
      [command, 3] // Update the ID to match the specific row you want to control
    );

    if (res.rowCount === 0) {
      throw new Error('No rows updated');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  try {
    // Fetch the command from the database
    const res = await client.query('SELECT command FROM "PHUW022" WHERE id = $1', [3]);

    if (res.rowCount === 0) {
      throw new Error('No records found');
    }

    return new Response(JSON.stringify(res.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Log the error to a file
    console.error(error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
