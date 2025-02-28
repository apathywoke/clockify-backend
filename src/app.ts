import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { connectDB } from './shared/database';
import { authRouter } from './features/auth/router';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Роуты
app.use('/api/auth', authRouter);

// Подключаем БД и запускаем сервер
const startServer = async () => {
  await connectDB();
  app.listen(config.PORT, () => {
    console.log(`🚀 Server running on port ${config.PORT}`);
  });
};

startServer();
