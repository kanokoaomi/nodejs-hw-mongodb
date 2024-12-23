import mongoose from 'mongoose';
import { getEnvVar } from '../../getEnvVar.js';

export const initMongoConnection = async () => {
  // const url = getEnvVar('MONGODB_URL');
  const user = getEnvVar("MONGODB_USER");
  const password = getEnvVar("MONGODB_PASSWORD");
  const url = getEnvVar("MONGODB_URL");
  const db = getEnvVar("MONGODB_DB");
  try {
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(`An error occured: ${error.message}`);
    throw error;
  }
};
