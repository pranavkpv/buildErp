import { IHasherEntity } from "../../Entities/repositoryEntities/Auth-management/IHasher"
import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { OTPInput } from "../../DTO/UserEntities/Otp"
import { IVerifyOTPUseCasesEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/VerifyOTPEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message"



export class VerifyOTPUseCases implements IVerifyOTPUseCasesEntity {
   private UserRepository: IUserRepositoryEntity
   private Hasher: IHasherEntity
   constructor(UserRepository: IUserRepositoryEntity, Hasher: IHasherEntity) {
      this.UserRepository = UserRepository
      this.Hasher = Hasher
   }
   async execute(input: OTPInput): Promise<commonOutput> {
      const { otp, email } = input
      const ExistUser = await this.UserRepository.findTempUserByEmailAndOTP(email, otp)
      if (!ExistUser) {
         return ResponseHelper.conflictData(userFailedMessage.OTP_WRONG)
      }
      if (ExistUser.otpCreatedAt == undefined || ExistUser.otpCreatedAt == null) {
         return ResponseHelper.conflictData(userFailedMessage.TIMESTAMP_MISS)
      }
      const exitOtp = new Date(ExistUser.otpCreatedAt).getTime();
      const now = Date.now();
      console.log(now - exitOtp)
      if ((now - exitOtp) > 45 * 1000) {
         return ResponseHelper.conflictData(userFailedMessage.EXPIRE_OTP)
      }
      const hashedPass = await this.Hasher.hash(ExistUser.password)
      await this.UserRepository.saveUser({
         username: ExistUser.username,
         email: ExistUser.email,
         phone: ExistUser.phone,
         password: hashedPass
      })
      await this.UserRepository.deleteTempUserByEmail(email)
      return ResponseHelper.success(userSuccessMessage.REGISTER)
   }
}

