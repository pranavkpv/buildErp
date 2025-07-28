
// resend otp

import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { ResendOTPInput } from "../../../Entities/Input-OutputEntities/UserEntities/Otp"
import { sendEmail } from "../../../Shared/utils/sendEmail"
import { IResendOTPUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/ResendOTPEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class ResendOTPUseCase implements IResendOTPUseCase {
   private UserRepository: IUserRepository
   constructor(UserRepossitory: IUserRepository) {
      this.UserRepository = UserRepossitory
   }
   async execute(input: ResendOTPInput): Promise<commonOutput> {
      try {
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

               return ResponseHelper.success(SUCCESS_MESSAGE.USER.OTP_SEND, HTTP_STATUS.OK)
            } else {
               return ResponseHelper.failure(ERROR_MESSAGE.USER.OTP_SEND_FAIL, HTTP_STATUS.BAD_REQUEST)
            }
         } else {
            return ResponseHelper.failure(ERROR_MESSAGE.USER.EMAIL_NOT_FOUND, HTTP_STATUS.BAD_REQUEST)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }

   }
}
