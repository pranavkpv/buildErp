import { IVerifyForgotpasswordUseCase } from "../../IUseCases/IAuth/IVerifyForgotPasswordOtp";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { verifyOtpInput } from "../../Entities/user.entity";
import { commonOutput } from "../../dto/common";
import { IUserRepository } from "../../../domain/Entities/IRepository/IUser";

export class VerifyForgotUseCase implements IVerifyForgotpasswordUseCase {
   constructor(
      private _userRepository: IUserRepository
   ) { }
   async execute(input: verifyOtpInput): Promise<commonOutput> {
      const { otp, email } = input
      const ExistUser = await this._userRepository.getTempUserByEmail(email)
      if (!ExistUser) {
         return ResponseHelper.badRequest(userFailedMessage.OTP_WRONG)
      }
      if (ExistUser.otp != otp) {
         return ResponseHelper.badRequest(userFailedMessage.INVALID_OTP)
      }
      if (ExistUser.otpCreatedAt == undefined || ExistUser.otpCreatedAt == null) {
         return ResponseHelper.conflictData(userFailedMessage.TIMESTAMP_MISS)
      }
      const exitOtp = new Date(ExistUser.otpCreatedAt).getTime();
      const now = Date.now();
      if ((now - exitOtp) > 30 * 1000) {
         return ResponseHelper.badRequest(userFailedMessage.EXPIRE_OTP)
      }
      await this._userRepository.deleteTempUserByEmail(email)
      return ResponseHelper.success(userSuccessMessage.CONFIRM_OTP)
   }
}