import express from 'express';
const app = express();
import bookRouter from './routes/bookRoutes.js';
import { logger, errorHandler } from './middleware/serverMiddleware.js';
const PORT = 5500;

app.use(express.json());

app.use(logger)

app.use('/api/book-collection', bookRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
  