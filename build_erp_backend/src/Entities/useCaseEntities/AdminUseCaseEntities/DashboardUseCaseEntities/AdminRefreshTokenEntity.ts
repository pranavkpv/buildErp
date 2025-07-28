import { Tokens } from "../../../Input-OutputEntities/auth";
import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IAdminRefreshTokenUseCase{
   execute(refreshToken: string): Promise<Tokens | commonOutput>
}