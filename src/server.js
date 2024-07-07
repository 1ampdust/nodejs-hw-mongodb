import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

// import contactsRouter from './routes/contacts.js'; // import routers // During authentication we do not need this import

//instead of import contactsRouter we should import:
import router from './routers/index.js';

import { env } from './utils/env.js';

//Import of middlewares
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

//Setting a port using an environment variable
const PORT = Number(env('PORT', '3000'));

//Function for configuring the server
export const setupServer = () => {
  const app = express();

  // Middleware for handling JSON
  app.use(express.json());

  // Middleware for handling CORS requests
  app.use(cors());

  //cookie
  app.use(cookieParser());

  //upload photos
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  // Logging with pino
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  //Route to get all contacts and get a contact by ID //During authentication we don't need this code
  // app.use(contactsRouter);

  //instead of it we should use
  app.use(router);

  // Handling invalid routes
  app.use('*', notFoundHandler);

  //Handling error during the get query
  app.use(errorHandler);

  // Starting the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};