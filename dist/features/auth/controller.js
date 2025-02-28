var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AuthService } from './service';
export class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield AuthService.register(req.body);
                res.status(201).json({ message: 'User registered successfully', token });
            }
            catch (error) {
                const errMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                res.status(400).json({ message: errMessage });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield AuthService.login(req.body);
                res.status(200).json({ message: 'Login successful', token });
            }
            catch (error) {
                const errMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                res.status(400).json({ message: errMessage });
            }
        });
    }
}
