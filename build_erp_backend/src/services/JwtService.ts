import jwt from 'jsonwebtoken';
import { JwtPayload, Tokens } from '../DTO/AuthEntities/auth';
import { IJwtServiceEntity } from '../Entities/Service.Entities/IToken.Entity';
import { createTokenEntity } from '../DTO/Service.Input.Entities/Jwt.Service.Entity';



export class JwtService implements IJwtServiceEntity {
  private accessSecret: string;
  private refreshSecret: string;

  constructor() {
    this.accessSecret = process.env.JWT_SECRET || '2a3e57b2c5300794701ff6a91cfef44336165a32aca038f1c56911cd6334bb65';
    this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'e996f879ea38e356dd62b3e9682daec65f382c3e09836c8dd0295e26a5a0fa71';
  }
  createAccessToken(input: createTokenEntity): string {
    const { _id, username, role } = input
    const accessToken = jwt.sign(
      { userId: _id, email: username, role: role },
      this.accessSecret,
      { expiresIn: '15m' }
    )
    return accessToken
  }

  generateTokens(_id: string, email: string, role: string): Tokens {
    const accessToken = jwt.sign(
      { userId: _id, email: email, role: role },
      this.accessSecret,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { userId: _id, email: email, role: role },
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

  verifyRefreshToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, this.refreshSecret);
      if (typeof decoded === 'object' && decoded !== null) {
        return decoded as JwtPayload;
      }
      return null;
    } catch {
      return null;
    }
  }
}