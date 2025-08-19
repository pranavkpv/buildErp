import { Tokens } from "../../../dto/AuthEntities/auth";
import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IRefreshTokenUseCaseEntity {
   execute(refreshToken: string): Promise<Tokens | commonOutput>
}