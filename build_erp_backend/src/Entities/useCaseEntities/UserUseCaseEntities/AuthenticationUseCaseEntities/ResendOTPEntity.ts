import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { ResendOTPInput } from "../../../../DTO/UserEntities/Otp";

export interface IResendOTPUseCaseEntity {
   execute(input: ResendOTPInput): Promise<commonOutput>
}