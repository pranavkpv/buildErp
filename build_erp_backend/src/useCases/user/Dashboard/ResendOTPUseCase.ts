
// resend otp

import { IUserRepository } from "../../../domain/repositories/IUserRepository"
import { ResendOTP, ResendOTPInput } from "../../../domain/types/user"
import { sendEmail } from "../../../infrastructure/utils/sendEmail"


export class ResendOTPUseCase {
   private UserRepository: IUserRepository
   constructor(UserRepossitory: IUserRepository) {
      this.UserRepository = UserRepossitory
   }
   async execute(input: ResendOTPInput): Promise<ResendOTP> {
      const { email } = input
      const existEmail = await this.UserRepository.findTempUserByEmail(email)
      if (existEmail) {
         const otp = Math.floor(100000 + Math.random() * 900000)
         const text = `Dear ${ existEmail.username }, your One-Time Password (OTP) for signing up with BuildERP is ${ otp }. Do not share this code with anyone.`
         const emailSend = await sendEmail(existEmail.email, "OTP verification", text)

         if (emailSend) {
            console.log(otp)
            const otpCreatedAt: Date = new Date()
            await this.UserRepository.findTempUserByEmailAndUpdateOTP(email, otp, otpCreatedAt)

            return {
               success: true,
               message: "An OTP has been sent to your email. Please check your inbox and enter the OTP for verification.",

            }
         } else {
            return {
               success: false,
               message: "Failed to send OTP email. Please try again later.",

            }
         }
      } else {
         return {
            success: false,
            message: "Email not found. Please check the email and try again.",
         }
      }
   }

}

