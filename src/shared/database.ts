import mongoose from 'mongoose';
import { config } from '../config/env';

export const connectDB = async () => {
  mongoose.set('debug', true);
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
