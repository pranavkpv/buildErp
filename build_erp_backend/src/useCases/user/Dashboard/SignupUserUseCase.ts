import { IUserRepository } from "../../../domain/repositories/IUserRepository"
import { userSignupInput, userSignupOutput } from "../../../domain/types/user"
import { AppError } from "../../../infrastructure/utils/AppError"
import { sendEmail } from "../../../infrastructure/utils/sendEmail"



export class SignupUserUseCase {
   private UserRepository: IUserRepository
   constructor(UserRepository: IUserRepository) {
      this.UserRepository = UserRepository
   }
   async execute(input: userSignupInput): Promise<userSignupOutput> {
   
      const { username, email, phone, password } = input

      const existUser = await  this.UserRepository.findUserByEmail(email)
      const existPhone = await this.UserRepository.findUserByPhone(phone)
      if (existUser) {
          return {
            success:false,
            message:"User Already Exist"
         }
      }
      if (existPhone) {
         return {
            success:false,
            message:"User Already Exist"
         }
      }

      const otp = Math.floor(100000 + Math.random() * 900000)
      const otpCreatedAt = new Date()

      await this.UserRepository.otpSave({username,
         email, phone,
         password,
         otp,
         otpCreatedAt})

      const text = `Dear ${ username }, your One-Time Password (OTP) for signing up with BuildERP is ${ otp }. Do not share this code with anyone.`
      const emailSend = await sendEmail(email, "OTP verification", text)

      if (emailSend) {
         console.log(otp)
         return {
            success: true,
            message: "An OTP has been sent to your email. Please check your inbox and enter the OTP for verification."
         }
      } else {
         throw new AppError(false,"Failed to send OTP email. Please try again later.",500)
      }
   }
}





