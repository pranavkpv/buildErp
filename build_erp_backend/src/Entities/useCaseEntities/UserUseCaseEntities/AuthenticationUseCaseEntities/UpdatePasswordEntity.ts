import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IUpdatePasswordUseCase {
   execute(input: { email: string, password: string }):Promise<commonOutput>
}