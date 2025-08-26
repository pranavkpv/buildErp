import { commonOutput } from "../../dto/common";

export interface IResendOTPUseCase {
   execute(email:string): Promise<commonOutput>
}