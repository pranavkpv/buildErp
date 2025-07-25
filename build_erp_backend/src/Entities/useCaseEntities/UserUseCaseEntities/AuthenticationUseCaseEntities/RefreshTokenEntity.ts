import { Tokens } from "../../../Input-OutputEntities/auth";

export interface IRefreshTokenUseCase {
   execute(refreshToken: string): Promise<Tokens>
}