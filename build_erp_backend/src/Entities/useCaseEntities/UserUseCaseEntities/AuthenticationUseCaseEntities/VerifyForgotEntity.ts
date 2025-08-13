import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { OTPInput } from "../../../../DTO/UserEntities/Otp";

export interface IVerifyForgotUseCaseEntity {
   execute(input: OTPInput): Promise<commonOutput>
}