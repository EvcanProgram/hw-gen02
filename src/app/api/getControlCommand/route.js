// src/app/api/receiveData/route.js
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
      if (command !== 'RGB_ON' && command !== 'BUZZER_ON' && command !== 'OFF') {
          throw new Error('Invalid status');
      }

      const res = await client.query(
          'UPDATE "PHUW022" SET command = $1 WHERE id = $2 RETURNING *',
          [command, 3] // ใช้ `1` เป็น ID ของแถวที่ต้องการอัปเดต หากมีหลายแถวให้ปรับเป็น ID ที่ต้องการ
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
    
    const res = await client.query('SELECT command FROM "PHUW022" WHERE id = $1', [87]);

    if (res.rowCount === 0) {
      throw new Error('No records found');
    }

    return new Response(JSON.stringify(res.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {

    const logPath = path.join(process.cwd(), 'log.txt');
    fs.appendFileSync(logPath, `${new Date().toISOString()} - ${error.message}\n`);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}