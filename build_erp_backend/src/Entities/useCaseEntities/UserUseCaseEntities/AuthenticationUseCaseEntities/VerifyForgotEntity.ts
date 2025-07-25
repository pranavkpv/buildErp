import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { OTPInput } from "../../../Input-OutputEntities/UserEntities/Otp";

export interface IVerifyForgotUseCase {
   execute(input: OTPInput): Promise<commonOutput>
}