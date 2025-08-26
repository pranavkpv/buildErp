import { IUserRepository } from "../../../domain/Entities/IRepository/IUser"
import { sendEmail } from "../../../Shared/utils/sendEmail"
import { IResendOTPUseCase } from "../../IUseCases/IAuth/IResendOtp"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message"
import { commonOutput } from "../../dto/common"

export class ResendOTPUseCase implements IResendOTPUseCase {
   constructor(
      private _userRepository: IUserRepository
   ) { }
   async execute(email: string): Promise<commonOutput> {
      const existEmail = await this._userRepository.getTempUserByEmail(email)
      if (existEmail) {
         const otp = (Math.floor(100000 + Math.random() * 900000)).toString()
         const text = `Dear ${ existEmail.username }, your One-Time Password (OTP) for signing up with BuildERP is ${ otp }. Do not share this code with anyone.`
         const emailSend = await sendEmail(existEmail.email, "OTP verification", text)

         if (emailSend) {
            console.log(otp)
            const otpCreatedAt: Date = new Date()
            await this._userRepository.updateTempUserOTP({ email, otp, otpCreatedAt })
            return ResponseHelper.success(userSuccessMessage.OTP_SEND)
         } else {
            return ResponseHelper.conflictData(userFailedMessage.OTP_SEND_FAIL)
         }
      } else {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }

   }
}
