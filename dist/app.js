var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    app.listen(config.PORT, () => {
        console.log(`🚀 Server running on port ${config.PORT}`);
    });
});
startServer();
