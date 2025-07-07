
import jwt from 'jsonwebtoken';
import { JwtPayload, Tokens } from '../domain/types/auth';

export interface JwtService {
  generateTokens( _id: string, username: string ): Tokens;
  verifyAccessToken(token: string): JwtPayload | null;
  verifyRefreshToken(token: string): { _id: string } | null;
}

export class AdminJwtServiceImpl implements JwtService {
  private accessSecret: string;
  private refreshSecret: string;

  constructor() {
    this.accessSecret = process.env.JWT_SECRET || '2a3e57b2c5300794701ff6a91cfef44336165a32aca038f1c56911cd6334bb65';
    this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'e996f879ea38e356dd62b3e9682daec65f382c3e09836c8dd0295e26a5a0fa71';
  }

  generateTokens( _id: string,email: string ): Tokens {
    const accessToken = jwt.sign(
      { userId: _id, username:email },
      this.accessSecret,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { userId:_id },
      this.refreshSecret,
      { expiresIn: '7d' }
    );
    return { accessToken, refreshToken };
  }

  verifyAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.accessSecret) as JwtPayload;
    } catch {
      return null;
    }
  }

  verifyRefreshToken(token: string): { _id: string } | null {
    try {
      return jwt.verify(token, this.refreshSecret) as { _id: string };
    } catch {
      return null;
    }
  }
}