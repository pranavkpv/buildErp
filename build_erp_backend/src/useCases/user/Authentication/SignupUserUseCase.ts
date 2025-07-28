import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { userSignupInput } from "../../../Entities/Input-OutputEntities/UserEntities/user"
import { sendEmail } from "../../../Shared/utils/sendEmail"
import { ISignupUserUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/SignupUserEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"



export class SignupUserUseCase implements ISignupUserUseCase {
   private UserRepository: IUserRepository
   constructor(UserRepository: IUserRepository) {
      this.UserRepository = UserRepository
   }
   async execute(input: userSignupInput): Promise<commonOutput> {

      try {
         const { username, email, phone, password } = input
         const special = "0123456987!@#$%^&*";
         if (username.split("").some(char => special.includes(char))) {
            return ResponseHelper.failure(ERROR_MESSAGE.USER.USERNAME_MISMATCH, HTTP_STATUS.CONFLICT);
         }

         const existUser = await this.UserRepository.findUserByEmail(email)
         const existPhone = await this.UserRepository.findUserByPhone(phone)
         if (existUser) {
            return ResponseHelper.failure(ERROR_MESSAGE.USER.EXIST, HTTP_STATUS.CONFLICT)
         }
         if (existPhone) {
            return ResponseHelper.failure(ERROR_MESSAGE.USER.EXIST, HTTP_STATUS.CONFLICT)
         }

         const otp = Math.floor(100000 + Math.random() * 900000)
         const otpCreatedAt = new Date()

         await this.UserRepository.otpSave({
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
            return ResponseHelper.success(SUCCESS_MESSAGE.USER.OTP_SEND, HTTP_STATUS.OK)
         } else {
            return ResponseHelper.failure(ERROR_MESSAGE.USER.OTP_SEND_FAIL, HTTP_STATUS.BAD_REQUEST)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}





