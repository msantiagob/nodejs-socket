import { connect } from 'mongoose';
import { MONGODB_URI } from './config.js';

export const connectDB = async () => {
  try {
    await connect(MONGODB_URI);
    console.log('Connected to db');
  } catch (error) {
    console.error('error de mongo' + error);
  }
};
