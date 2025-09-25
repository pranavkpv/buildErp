import { commonOutput } from '../../dto/common';
import { verifyOtpInput } from '../../entities/user.entity';

export interface IVerifyOTPUseCase {
   execute(input: verifyOtpInput):Promise<commonOutput>
}