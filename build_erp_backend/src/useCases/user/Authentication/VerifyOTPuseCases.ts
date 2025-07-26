import { IHasher } from "../../../Entities/repositoryEntities/Auth-management/IHasher"
import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { OTPInput } from "../../../Entities/Input-OutputEntities/UserEntities/Otp"
import { IVerifyOTPUseCases } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/VerifyOTPEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"



export class VerifyOTPUseCases implements IVerifyOTPUseCases {
   private UserRepository: IUserRepository
   private Hasher: IHasher
   constructor(UserRepository: IUserRepository, Hasher: IHasher) {
      this.UserRepository = UserRepository
      this.Hasher = Hasher
   }
   async execute(input: OTPInput):Promise<commonOutput> {
      const { otp, email } = input
      const ExistUser = await this.UserRepository.findTempUserByEmailAndOTP(email, otp)
      if (!ExistUser) {
         return ResponseHelper.failure(ERROR_MESSAGE.USER.OTP_WRONG,HTTP_STATUS.CONFLICT)
      }
      if (ExistUser.otpCreatedAt == undefined || ExistUser.otpCreatedAt == null) {
         return ResponseHelper.failure(ERROR_MESSAGE.USER.TIMESTAMP_MISS,HTTP_STATUS.CONFLICT)
      }
      const exitOtp = new Date(ExistUser.otpCreatedAt).getTime();
      const now = Date.now();
      console.log(now - exitOtp)
      if ((now - exitOtp) > 45 * 1000) {
         return ResponseHelper.failure(ERROR_MESSAGE.USER.EXPIRE_OTP,HTTP_STATUS.CONFLICT)
      }
      const hashedPass = await this.Hasher.hash(ExistUser.password)
      await this.UserRepository.saveUser({
         username: ExistUser.username,
         email: ExistUser.email,
         phone: ExistUser.phone,
         password: hashedPass
      })
      await this.UserRepository.deleteTempUserByEmail(email)
      return ResponseHelper.success(SUCCESS_MESSAGE.USER.REGISTER,HTTP_STATUS.CREATED)
   }
}

