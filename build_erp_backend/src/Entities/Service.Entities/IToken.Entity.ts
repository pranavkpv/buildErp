import { JwtPayload } from "../../DTO/AuthEntities/auth";
import { Tokens } from "../../DTO/AuthEntities/auth";
import { createTokenEntity } from "../../DTO/Service.Input.Entities/Jwt.Service.Entity";

export interface IJwtServiceEntity {
  createAccessToken(input:createTokenEntity):string
  generateTokens(_id: string, email: string, role: string): Tokens;
  verifyAccessToken(token: string): JwtPayload | null;
  verifyRefreshToken(token: string): JwtPayload | null;
}