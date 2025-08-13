import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { OTPInput } from "../../../../DTO/UserEntities/Otp";

export interface IVerifyOTPUseCasesEntity{
   execute(input: OTPInput):Promise<commonOutput>
}