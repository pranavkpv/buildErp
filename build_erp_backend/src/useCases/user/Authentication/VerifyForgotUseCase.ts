import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { OTPInput } from "../../../Entities/Input-OutputEntities/UserEntities/Otp";
import { IVerifyForgotUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/VerifyForgotEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";

export class VerifyForgotUseCase implements IVerifyForgotUseCase {
   private UserRepository: IUserRepository
   constructor(UserRepository: IUserRepository) {
      this.UserRepository = UserRepository
   }
   async execute(input: OTPInput): Promise<commonOutput> {
      const { otp, email } = input
      const ExistUser = await this.UserRepository.findTempUserByEmailAndOTP(email, otp)
      if (!ExistUser) {
         return ResponseHelper.failure(ERROR_MESSAGE.USER.OTP_WRONG, HTTP_STATUS.UNAUTHORIZED)
      }
      if (ExistUser.otpCreatedAt == undefined || ExistUser.otpCreatedAt == null) {
         return ResponseHelper.failure(ERROR_MESSAGE.USER.TIMESTAMP_MISS, HTTP_STATUS.CONFLICT)
      }
      const exitOtp = new Date(ExistUser.otpCreatedAt).getTime();
      const now = Date.now();
      if ((now - exitOtp) > 30 * 1000) {
         return ResponseHelper.failure(ERROR_MESSAGE.USER.EXPIRE_OTP, HTTP_STATUS.BAD_REQUEST)
      }
      await this.UserRepository.deleteTempUserByEmail(email)
      return ResponseHelper.success(SUCCESS_MESSAGE.USER.CONFIRM_OTP, HTTP_STATUS.OK)
   }
}