import { setupServer } from './server.js';
import { initMongoDB } from './db/initMongoDB.js';

const start = async () => {
  try {
    await initMongoDB();
    setupServer();
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

start();
