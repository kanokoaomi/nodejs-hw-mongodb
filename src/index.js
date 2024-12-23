import { initMongoConnection } from './db/initMongoConnection';
import { setupServer } from './server';

const boostrap = async () => {
  await initMongoConnection();
  setupServer();
};

boostrap();
