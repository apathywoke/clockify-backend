import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1/clockify',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key',
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || '1h',
};