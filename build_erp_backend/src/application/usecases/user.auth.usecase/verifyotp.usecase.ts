import { IHasher } from "../../../domain/interfaces/Auth-management/IHasher"
import { IVerifyOTPUseCase } from "../../interfaces/useCase.Entity/Auth.UseCase/IVerifyotp.usecase.ts"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message"
import { IUserRepository } from "../../../domain/interfaces/User-management/IUserRepository"
import { verifyOtpInput } from "../../entities/user.entity"
import { commonOutput } from "../../dto/common"



export class VerifyOTPUseCases implements IVerifyOTPUseCase {
   constructor(private _userRepository: IUserRepository, private _hasher: IHasher) { }
   async execute(input: verifyOtpInput): Promise<commonOutput> {
      const { otp, email } = input
      const ExistUser = await this._userRepository.getTempUserByEmailAndOTP(email, otp)
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
      const hashedPass = await this._hasher.hash(ExistUser.password)
      await this._userRepository.createUser({
         username: ExistUser.username,
         email: ExistUser.email,
         phone: ExistUser.phone,
         password: hashedPass
      })
      await this._userRepository.deleteTempUserByEmail(email)
      return ResponseHelper.success(userSuccessMessage.REGISTER)
   }
}

