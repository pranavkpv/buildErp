import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { ResendOTPInput } from "../../DTO/UserEntities/Otp"
import { sendEmail } from "../../Shared/utils/sendEmail"
import { IResendOTPUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/ResendOTPEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message"


export class ResendOTPUseCase implements IResendOTPUseCaseEntity {
   private UserRepository: IUserRepositoryEntity
   constructor(UserRepossitory: IUserRepositoryEntity) {
      this.UserRepository = UserRepossitory
   }
   async execute(input: ResendOTPInput): Promise<commonOutput> {
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

            return ResponseHelper.success(userSuccessMessage.OTP_SEND)
         } else {
            return ResponseHelper.conflictData(userFailedMessage.OTP_SEND_FAIL)
         }
      } else {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }

   }
}
