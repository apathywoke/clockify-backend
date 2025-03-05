import { Router } from 'express';
import { AuthController } from './controller';

const router = Router();

router.post('/sign-up', AuthController.register);
router.post('/log-in', AuthController.login);

export { router as authRouter };