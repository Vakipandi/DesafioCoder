import mongoose from 'mongoose';
import dotenv from 'dotenv';
import __dirname from '../../utils.js';

dotenv.config({
  path: `${__dirname}/.env`,
});

const uri = process.env.DB_CONNECTION;

async function connectDB() {
  try {
    console.log();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set('strictQuery', false);
    console.log('Connect successfully!');
  } catch (error) {
    console.log(error);
  }
}

connectDB();
