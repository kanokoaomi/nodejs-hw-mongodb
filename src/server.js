import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();
const PORT = Number(process.env.PORT);

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.static('uploads'));
  app.use(cookieParser());

  const corsMiddleware = cors({ credentials: true });
  app.use(corsMiddleware);

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  // app.use(logger);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('/auth', authRouter);
  app.use('/api-docs', swaggerDocs());
  app.use('/contacts', contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
