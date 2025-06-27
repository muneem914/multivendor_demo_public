
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '../types/role.enum';
import ErrorHandler from '../utils/ErrorHandler';

interface DecodedToken {
  id: string;
  role: Role;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  //  getting token from cookies
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorHandler('No token provided. Log in first', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch {
    return next(new ErrorHandler('Invalid or expired token', 401));
  }
};

export const requireRole = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user?.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
