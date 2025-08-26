import { commonOutput } from "../../dto/common";

export interface IRefreshTokenUseCase {
   execute(token:string):Promise<commonOutput<string> | commonOutput>
}