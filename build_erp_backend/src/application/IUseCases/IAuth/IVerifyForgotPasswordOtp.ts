import { commonOutput } from '../../dto/common';
import { verifyOtpInput } from '../../entities/user.entity';

export interface IVerifyForgotpasswordUseCase {
   execute(input: verifyOtpInput): Promise<commonOutput>
}