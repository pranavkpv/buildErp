import { Tokens } from "../../../Input-OutputEntities/auth";

export interface IAdminRefreshTokenUseCase{
   execute(refreshToken: string): Promise<Tokens>
}