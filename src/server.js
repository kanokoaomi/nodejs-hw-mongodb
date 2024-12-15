import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

export const setupServer = () => {
  const app = express();

  const PORT = 3017;

  const corsMiddleware = cors();
  app.use(corsMiddleware);

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Content-Type, Authorization',
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(logger);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port {PORT}`);
  });
};
