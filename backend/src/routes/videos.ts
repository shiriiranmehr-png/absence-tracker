import { Router } from 'express';
import { pool } from '../db';

export const videoRouter = Router();

videoRouter.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT id, title, file_name AS "fileName", template_id AS "templateId", duration, thumbnail_uri AS "thumbnailUri", content_base64 AS "contentBase64", created_at AS "createdAt" FROM videos ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching videos', error);
    res.status(500).json({ error: 'Unable to fetch videos' });
  }
});

videoRouter.post('/', async (req, res) => {
  const { title, fileName, templateId, duration, thumbnailUri, contentBase64 } = req.body;

  if (!title || !fileName || !templateId || !duration || !thumbnailUri || !contentBase64) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO videos (title, file_name, template_id, duration, thumbnail_uri, content_base64) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, title, file_name AS "fileName", template_id AS "templateId", duration, thumbnail_uri AS "thumbnailUri", content_base64 AS "contentBase64", created_at AS "createdAt"',
      [title, fileName, templateId, duration, thumbnailUri, contentBase64]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting video', error);
    res.status(500).json({ error: 'Unable to save video' });
  }
});
