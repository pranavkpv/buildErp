
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../services/JwtService';

export const authMiddleware = (jwtService: JwtService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    const payload = jwtService.verifyAccessToken(token);
    if (!payload) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = payload; 
    next();
  };
};


declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; email: string };
    }
  }
}