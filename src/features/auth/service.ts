import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { UserModel } from '../../entities/user/model';
import { RegisterDTO, LoginDTO } from '../../entities/user/dto';
import { config } from '../../config/env';
import { Types } from 'mongoose';  // Добавляем импорт для ObjectId

export class AuthService {

  static async register(data: RegisterDTO) {
    const { email, displayName, password } = data;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, displayName, password: hashedPassword });
    await user.save();

    return this.generateToken(user._id);
  }

  static async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return this.generateToken(user._id);
  }

  private static generateToken(userId: Types.ObjectId): string {
    if (!config.JWT_SECRET || typeof config.JWT_SECRET !== 'string') {
      throw new Error('JWT_SECRET is not defined or has incorrect type');
    }
  
    return jwt.sign(
      { userId: userId.toHexString() }, // ObjectId → string
      config.JWT_SECRET as Secret, // Указываем явно тип
    );
  }
}
