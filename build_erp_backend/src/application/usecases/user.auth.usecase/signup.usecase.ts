import { IUserRepository } from "../../../domain/interfaces/User-management/IUserRepository"
import { sendEmail } from "../../../Shared/utils/sendEmail"
import { ISignupUserUseCase } from "../../interfaces/useCase.Entity/Auth.UseCase/ISignup.usecase"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message"
import { userSignupinput } from "../../entities/user.entity"
import { commonOutput } from "../../dto/common"



export class SignupUserUseCase implements ISignupUserUseCase {
   constructor(private _userRepository: IUserRepository) { }
   async execute(input: userSignupinput): Promise<commonOutput> {
      const { username, email, phone, password } = input
      const existUser = await this._userRepository.getUserByEmail(email)
      const existPhone = await this._userRepository.getUserByPhone(phone)
      if (existUser) {
         return ResponseHelper.conflictData(userFailedMessage.EXIST_GOOGLE)
      }
      if (existPhone) {
         return ResponseHelper.conflictData(userFailedMessage.EXIST_GOOGLE)
      }

      const otp = (Math.floor(100000 + Math.random() * 900000)).toString()
      const otpCreatedAt = new Date()

      await this._userRepository.saveTempUser({
         username,
         email, phone,
         password,
         otp,
         otpCreatedAt
      })

      const text = `Dear ${ username }, your One-Time Password (OTP) for signing up with BuildERP is ${ otp }. Do not share this code with anyone.`
      const emailSend = await sendEmail(email, "OTP verification", text)

      if (emailSend) {
         console.log(otp)
         return ResponseHelper.success(userSuccessMessage.OTP_SEND)
      } else {
         return ResponseHelper.badRequest(userFailedMessage.OTP_SEND_FAIL)
      }
   }
}





