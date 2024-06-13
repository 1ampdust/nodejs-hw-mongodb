import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import mongoose from 'mongoose';

const PORT = Number(env('PORT', '3000'));
export const setupServer = () => {
  const app = express();
  
  app.use(cors());
  
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Failed to retrieve contacts',
        error: error.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const contactId = req.params.contactId;
    try {
      if (!mongoose.isValidObjectId(contactId)) {
        return res.status(404).json({
          status: 404,
          message: `Id ${contactId} is not valid`,
        });
      }
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: `Contact with id ${contactId} not found!`,
        });
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Something went wrong!`,
        error: error.message,
      });
    }
  });

  app.use(notFoundMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });

  return app;
};
