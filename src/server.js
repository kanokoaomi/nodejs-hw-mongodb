import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import dotenv from 'dotenv';
// import { ContactCollection } from './db/models/contact';
// import { getContactById, getContacts } from './service/contact';
import * as contactServises from './services/contact.js';

dotenv.config();
const PORT = Number(process.env.PORT);

export const setupServer = () => {
  const app = express();

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

  // getting all the contacts

  app.get('/contacts', async (req, res) => {
    const data = await contactServises.getContacts();

    // if (!data) {
    //   return res.status(404).json({
    //     status: 404,
    //     message: 'No data, bro!',
    //   });
    // }

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  // getting the contact by ID

  app.get('/contacts/:contactId', async (req, res) => {
    const { id } = req.params;

    const data = await contactServises.getContactById(id);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'No data, bro!',
      });
    }

    res.json({
      status: 200,
      message: 'Successfully found contact with id {contactId}!',
      data,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Contact not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
