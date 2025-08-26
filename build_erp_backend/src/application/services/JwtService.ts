import { createTokenInput, JwtPayloadData, Tokens } from '../Entities/token.entity';
import { IJwtService } from '../../domain/Entities/Service.Entities/IJwtservice';
import jwt, { TokenExpiredError } from 'jsonwebtoken'



export class JwtService implements IJwtService {
  private accessSecret: string;
  private refreshSecret: string;

  constructor() {
    this.accessSecret = process.env.JWT_SECRET || '2a3e57b2c5300794701ff6a91cfef44336165a32aca038f1c56911cd6334bb65';
    this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'e996f879ea38e356dd62b3e9682daec65f382c3e09836c8dd0295e26a5a0fa71';
  }
  createAccessToken(input: createTokenInput): string {
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

  verifyAccessToken(token: string): JwtPayloadData | null {
    try {
      return jwt.verify(token, this.accessSecret) as JwtPayloadData;
    } catch(error:any) {
      if (error instanceof TokenExpiredError) {
        return null; 
      }
      throw error; 
    }
  }

  verifyRefreshToken(token: string): JwtPayloadData | null {
    try {
      const decoded = jwt.verify(token, this.refreshSecret);
      if (typeof decoded === 'object' && decoded !== null) {
        return decoded as JwtPayloadData;
      }
      return null;
    } catch {
      return null;
    }
  }
}