import { Tokens } from "../../../Input-OutputEntities/auth";
import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IRefreshTokenUseCase {
   execute(refreshToken: string): Promise<Tokens | commonOutput>
}