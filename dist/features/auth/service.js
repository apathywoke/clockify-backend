var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../entities/user/model';
import { config } from '../../config/env';
export class AuthService {
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, displayName, password } = data;
            const existingUser = yield UserModel.findOne({ email });
            if (existingUser)
                throw new Error('User already exists');
            const hashedPassword = yield bcrypt.hash(password, 10);
            const user = new UserModel({ email, displayName, password: hashedPassword });
            yield user.save();
            return this.generateToken(user._id);
        });
    }
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const user = yield UserModel.findOne({ email });
            if (!user)
                throw new Error('Invalid credentials');
            const isMatch = yield bcrypt.compare(password, user.password);
            if (!isMatch)
                throw new Error('Invalid credentials');
            return this.generateToken(user._id);
        });
    }
    static generateToken(userId) {
        if (!config.JWT_SECRET || typeof config.JWT_SECRET !== 'string') {
            throw new Error('JWT_SECRET is not defined or has incorrect type');
        }
        return jwt.sign({ userId: userId.toHexString() }, // ObjectId → string
        config.JWT_SECRET);
    }
}
