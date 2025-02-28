import { Request, Response } from 'express';
import { AuthService } from './service';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
          console.log('Request body:', req.body);
          const token = await AuthService.register(req.body);
          res.status(201).json({ message: 'User registered successfully', token });
        } catch (error: any) {
          const errMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          console.error(error);  // Логируем ошибку для отладки
          res.status(400).json({ message: `Registration failed: ${errMessage}` });  // Отправляем ошибку в ответе
        }
      }
      
      static async login(req: Request, res: Response) {
        try {
          const token = await AuthService.login(req.body);
          res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
          const errMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          res.status(400).json({ message: errMessage });
        }
      }
      
}
