import { commonOutput } from "../../DTO/CommonEntities/common"
import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository"
import { ISendOTPUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/SendOTPEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { sendEmail } from "../../Shared/utils/sendEmail"
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message"

export class SendOTPUseCase implements ISendOTPUseCaseEntity {
   private UserRepository: IUserRepositoryEntity
   constructor(UserRepository: IUserRepositoryEntity) {
      this.UserRepository = UserRepository
   }
   async execute(input: { email: string }): Promise<commonOutput> {
      const { email } = input
      const existUser = await this.UserRepository.findUserByEmail(email)
      if (!existUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
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
         return ResponseHelper.success(userSuccessMessage.OTP_SEND)
      } else {
         return ResponseHelper.badRequest(userFailedMessage.OTP_SEND_FAIL)
      }
   }
}