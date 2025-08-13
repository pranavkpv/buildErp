import { Tokens } from "../../../../DTO/AuthEntities/auth";
import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IAdminRefreshTokenUseCaseEntity {
   execute(refreshToken: string): Promise<Tokens | commonOutput>
}