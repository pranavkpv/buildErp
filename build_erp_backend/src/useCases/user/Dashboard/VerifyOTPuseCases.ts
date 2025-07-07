import { IHasher } from "../../../domain/repositories/IHasher"
import { IUserRepository } from "../../../domain/repositories/IUserRepository"
import { OTPInput, OTPOutput } from "../../../domain/types/user"
import { AppError } from "../../../infrastructure/utils/AppError"


export class VerifyOTPUseCases {
   private UserRepository: IUserRepository
   private Hasher: IHasher
   constructor(UserRepository: IUserRepository, Hasher: IHasher) {
      this.UserRepository = UserRepository
      this.Hasher = Hasher
   }
   async execute(input: OTPInput):Promise<OTPOutput> {
      const { otp, email } = input
      const ExistUser = await this.UserRepository.findTempUserByEmailAndOTP(email, otp)
      if (!ExistUser) {
         return {
            success:false,
            message:"entered OTP is wrong"
         }
      }
      if (ExistUser.otpCreatedAt == undefined || ExistUser.otpCreatedAt == null) {
         throw new AppError(false, "OTP creation timestamp is missing", 500)
      }
      const exitOtp = new Date(ExistUser.otpCreatedAt).getTime();
      const now = Date.now();
      if ((now - exitOtp) > 30 * 1000) {
         return {
            success:false,
            message:"Your OTP has timed out. Kindly resend and try again."
         }
      }



      const hashedPass = await this.Hasher.hash(ExistUser.password)

      await this.UserRepository.saveUser({
         username: ExistUser.username,
         email: ExistUser.email,
         phone: ExistUser.phone,
         password: hashedPass
      })
      await this.UserRepository.deleteTempUserByEmail(email)
      return {
         success: true,
         message: "OTP confirmed. User registration was successful."
      }
   }
}

