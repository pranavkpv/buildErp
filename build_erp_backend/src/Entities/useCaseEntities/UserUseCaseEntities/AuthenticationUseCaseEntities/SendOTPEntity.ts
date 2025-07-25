import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface ISendOTPUseCase{
   execute(input: { email: string }):Promise<commonOutput>
}