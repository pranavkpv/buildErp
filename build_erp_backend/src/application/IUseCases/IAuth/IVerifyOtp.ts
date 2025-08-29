import { commonOutput } from '../../dto/common';
import { verifyOtpInput } from '../../Entities/user.entity';

export interface IVerifyOTPUseCase {
   execute(input: verifyOtpInput):Promise<commonOutput>
}