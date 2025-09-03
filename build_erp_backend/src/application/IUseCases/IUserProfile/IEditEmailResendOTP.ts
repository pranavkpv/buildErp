import { commonOutput } from '../../dto/common';

export interface IEditEmailResendOTPUseCase {
   execute(): Promise<commonOutput>
}