import { commonOutput } from "../../../dto/common";

export interface ISendOTPUseCase{
   execute(input: { email: string }):Promise<commonOutput>
}