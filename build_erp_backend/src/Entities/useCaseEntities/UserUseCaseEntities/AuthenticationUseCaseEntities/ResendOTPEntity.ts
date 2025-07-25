import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { ResendOTPInput } from "../../../Input-OutputEntities/UserEntities/Otp";

export interface IResendOTPUseCase {
   execute(input: ResendOTPInput): Promise<commonOutput>
}