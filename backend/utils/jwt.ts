import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
}; 