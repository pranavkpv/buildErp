import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { OTPInput } from "../../DTO/UserEntities/Otp";
import { IVerifyForgotUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/VerifyForgotEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message";

export class VerifyForgotUseCase implements IVerifyForgotUseCaseEntity {
   private UserRepository: IUserRepositoryEntity
   constructor(UserRepository: IUserRepositoryEntity) {
      this.UserRepository = UserRepository
   }
   async execute(input: OTPInput): Promise<commonOutput> {
      const { otp, email } = input
      const ExistUser = await this.UserRepository.findTempUserByEmailAndOTP(email, otp)
      if (!ExistUser) {
         return ResponseHelper.badRequest(userFailedMessage.OTP_WRONG)
      }
      if (ExistUser.otpCreatedAt == undefined || ExistUser.otpCreatedAt == null) {
         return ResponseHelper.conflictData(userFailedMessage.TIMESTAMP_MISS)
      }
      const exitOtp = new Date(ExistUser.otpCreatedAt).getTime();
      const now = Date.now();
      if ((now - exitOtp) > 30 * 1000) {
         return ResponseHelper.badRequest(userFailedMessage.EXPIRE_OTP)
      }
      await this.UserRepository.deleteTempUserByEmail(email)
      return ResponseHelper.success(userSuccessMessage.CONFIRM_OTP)
   }
}