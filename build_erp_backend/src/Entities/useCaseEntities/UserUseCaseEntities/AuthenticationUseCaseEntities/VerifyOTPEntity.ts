import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { OTPInput } from "../../../Input-OutputEntities/UserEntities/Otp";

export interface IVerifyOTPUseCases{
   execute(input: OTPInput):Promise<commonOutput>
}