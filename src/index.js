import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const Appstart = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

Appstart();
