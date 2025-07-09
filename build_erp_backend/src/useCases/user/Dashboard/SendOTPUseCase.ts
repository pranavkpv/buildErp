import { IUserRepository } from "../../../domain/repositories/IUserRepository"
import { User, userSignupOutput } from "../../../domain/types/user"
import { AppError } from "../../../infrastructure/utils/AppError"
import { sendEmail } from "../../../infrastructure/utils/sendEmail"

export class SendOTPUseCase {
   private UserRepository: IUserRepository
   constructor(UserRepository: IUserRepository) {
      this.UserRepository = UserRepository
   }
   async execute(input: { email: string }) {
      const { email } = input
      const existUser = await this.UserRepository.findUserByEmail(email)
      if (!existUser) {
         return {
            success: false,
            message: "User not exist please ensure your email is correct"
         }
      }
      const otp = Math.floor(100000 + Math.random() * 900000)
      const otpCreatedAt = new Date()
      const { username, phone, password } = existUser

      await this.UserRepository.otpSave({
         username,
         email,
         phone,
         password,
         otp,
         otpCreatedAt
      })

      const text = `Dear ${ username }, your One-Time Password (OTP) for signing up with BuildERP is ${ otp }. Do not share this code with anyone.`
      const emailSend = await sendEmail(email, "OTP verification", text)
      if (emailSend) {
         console.log(otp)
         return {
            success: true,
            message: "An OTP has been sent to your email. Please check your inbox and enter the OTP for verification."
         }
      } else {
         throw new AppError(false, "Failed to send OTP email. Please try again later.", 500)
      }
   }
}