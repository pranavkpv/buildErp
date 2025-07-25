
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../Entities/repositoryEntities/Auth-management/IToken';

export const authMiddleware = (jwtService: JwtService) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.refreshToken
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }
     const payload = jwtService.verifyRefreshToken(token);
    if (!payload || !payload.role) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
    if(payload.role != "user"){
      res.status(401).json({ message: 'This user cannot be accessible' });
      return
    }
    next();
  };
};


