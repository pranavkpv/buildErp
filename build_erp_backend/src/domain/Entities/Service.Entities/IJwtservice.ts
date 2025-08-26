import { createTokenInput, JwtPayloadData, Tokens } from "../../../application/Entities/token.entity";

export interface IJwtService {
  createAccessToken(input:createTokenInput):string
  generateTokens(_id: string, email: string, role: string): Tokens;
  verifyAccessToken(token: string): JwtPayloadData | null;
  verifyRefreshToken(token: string): JwtPayloadData | null;
}