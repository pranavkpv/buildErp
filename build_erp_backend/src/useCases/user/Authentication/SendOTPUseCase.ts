import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository"
import { ISendOTPUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/SendOTPEntity"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { ResponseHelper } from "../../../Shared/utils/response"
import { sendEmail } from "../../../Shared/utils/sendEmail"

export class SendOTPUseCase implements ISendOTPUseCase {
   private UserRepository: IUserRepository
   constructor(UserRepository: IUserRepository) {
      this.UserRepository = UserRepository
   }
   async execute(input: { email: string }): Promise<commonOutput> {
      try {
         const { email } = input
         const existUser = await this.UserRepository.findUserByEmail(email)
         if (!existUser) {
            return ResponseHelper.failure(ERROR_MESSAGE.USER.EMAIL_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED)
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
            return ResponseHelper.success(SUCCESS_MESSAGE.USER.OTP_SEND, HTTP_STATUS.OK)
         } else {
            return ResponseHelper.failure(ERROR_MESSAGE.USER.OTP_SEND_FAIL, HTTP_STATUS.BAD_REQUEST)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}