import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getDb, migrate } from './db.js';
import inscripcionesRouter from './routes/inscripciones.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: (origin, cb) => {
    const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
    if (!origin || allowed.length === 0 || allowed.includes(origin)) return cb(null, true);
    return cb(new Error('CORS no permitido para este origen'));
  },
  credentials: true
}));

app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.use('/inscripciones', inscripcionesRouter);

const port = Number(process.env.PORT) || 4000;

const db = getDb();
migrate(db);
db.close();

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});


