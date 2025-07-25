import { JwtPayload } from "jsonwebtoken";
import { Tokens } from "../../Input-OutputEntities/auth";

export interface JwtService {
  generateTokens( _id: string, email: string,role:string ): Tokens;
  verifyAccessToken(token: string): JwtPayload | null;
  verifyRefreshToken(token: string):JwtPayload | null;
}