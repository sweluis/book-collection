import pool from './db.js';

process.on('SIGINT', async () => {
  await pool.end();  // Closes all active connections in the pool
  console.log('Connection pool has been closed');
  process.exit(0);  // Exit the process after closing the pool
});

import express from 'express';
const app = express();
import bookRouter from './routes/bookRoutes.js';
const PORT = 5500;

app.use(express.json());


app.use('/api/book-collection', bookRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
  