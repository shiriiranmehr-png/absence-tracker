import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

export const pool = new Pool({ connectionString });

export async function initDatabase() {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        file_name TEXT NOT NULL,
        template_id TEXT NOT NULL,
        duration INTEGER NOT NULL,
        thumbnail_uri TEXT NOT NULL,
        content_base64 TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);
  } finally {
    client.release();
  }
}
