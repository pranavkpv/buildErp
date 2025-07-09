import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { OTPInput, OTPOutput } from "../../../domain/types/user";
import { AppError } from "../../../infrastructure/utils/AppError";

export class VerifyForgotUseCase {
   private UserRepository: IUserRepository
   constructor(UserRepository: IUserRepository) {
      this.UserRepository = UserRepository
   }
   async execute(input: OTPInput): Promise<OTPOutput> {
      const { otp, email } = input
      const ExistUser = await this.UserRepository.findTempUserByEmailAndOTP(email, otp)
      if (!ExistUser) {
         return {
            success: false,
            message: "entered OTP is wrong"
         }
      }
      if (ExistUser.otpCreatedAt == undefined || ExistUser.otpCreatedAt == null) {
         throw new AppError(false, "OTP creation timestamp is missing", 500)
      }
      const exitOtp = new Date(ExistUser.otpCreatedAt).getTime();
      const now = Date.now();
      if ((now - exitOtp) > 30 * 1000) {
         return {
            success: false,
            message: "Your OTP has timed out. Kindly resend and try again."
         }
      }
      await this.UserRepository.deleteTempUserByEmail(email)
      return {
         success: true,
         message: "OTP confirmed. User registration was successful."
      }
   }
}