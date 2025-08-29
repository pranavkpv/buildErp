import { commonOutput } from '../../dto/common';
import { verifyOtpInput } from '../../Entities/user.entity';

export interface IVerifyForgotpasswordUseCase {
   execute(input: verifyOtpInput): Promise<commonOutput>
}