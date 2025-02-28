// src/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // или более строгий тип, если у вас есть тип для user
    }
  }
}
