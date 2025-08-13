import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { userSignupInput } from "../../DTO/UserEntities/user"
import { sendEmail } from "../../Shared/utils/sendEmail"
import { ISignupUserUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/SignupUserEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message"



export class SignupUserUseCase implements ISignupUserUseCaseEntity {
   private UserRepository: IUserRepositoryEntity
   constructor(UserRepository: IUserRepositoryEntity) {
      this.UserRepository = UserRepository
   }
   async execute(input: userSignupInput): Promise<commonOutput> {
      const { username, email, phone, password } = input
      const special = "0123456987!@#$%^&*";
      if (username.split("").some(char => special.includes(char))) {
         return ResponseHelper.conflictData(userFailedMessage.USERNAME_MISMATCH)
      }

      const existUser = await this.UserRepository.findUserByEmail(email)
      const existPhone = await this.UserRepository.findUserByPhone(phone)
      if (existUser) {
         return ResponseHelper.conflictData(userFailedMessage.EXIST_GOOGLE)
      }
      if (existPhone) {
         return ResponseHelper.conflictData(userFailedMessage.EXIST_GOOGLE)
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
         return ResponseHelper.success(userSuccessMessage.OTP_SEND)
      } else {
         return ResponseHelper.badRequest(userFailedMessage.OTP_SEND_FAIL)
      }
   }
}





