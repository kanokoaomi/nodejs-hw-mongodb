// mongodb+srv://KanokoAomi:<db_password>@cluster0.pl7kc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://KanokoAomi:cS58jBd7FE5LtS_@cluster0.pl7kc.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0',
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(`An error occured: ${error.message}`);
    throw error;
  }
};
