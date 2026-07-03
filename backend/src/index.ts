import express from 'express';
import cors from 'cors';
import { json } from 'express';
import dotenv from 'dotenv';
import { initDatabase } from './db';
import { videoRouter } from './routes/videos';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(json({ limit: '20mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/videos', videoRouter);

initDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API server listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing database', error);
    process.exit(1);
  });
