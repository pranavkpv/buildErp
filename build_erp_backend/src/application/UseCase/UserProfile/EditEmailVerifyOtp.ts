import { IUserRepository } from "../../../domain/Entities/IRepository/IUser";
import { IUserMapper } from "../../../domain/IMappers/IUser.mapper";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { userLoginDTO } from "../../dto/user.dto";
import { IEditEmailVerifyOtpUseCase } from "../../IUseCases/IUserProfile/IEditEmailVerifyOtp";

export class EditEmailVerifyOtpUseCase implements IEditEmailVerifyOtpUseCase {
   constructor(
      private _userRepository: IUserRepository,
      private _userMapper: IUserMapper
   ) { }
   async execute(otp: string): Promise<commonOutput<userLoginDTO> | commonOutput> {
      const storedData = await this._userRepository.getredisDataInUpdateEmail()
      if (otp !== storedData.otp) {
         return ResponseHelper.conflictData(userFailedMessage.INVALID_OTP)
      }
      const response = await this._userRepository.updateUserEmail(storedData.email, storedData.id)
      if (!response) {
         return ResponseHelper.conflictData(userFailedMessage.FAILED_UPDATE_EMAIL)
      } else {
         const data = await this._userRepository.getUserById(response._id)
         if (!data) return ResponseHelper.conflictData(userFailedMessage.FAILED_UPDATE_EMAIL)
         const mappedData = this._userMapper.touserLoginDTO(data)
         return ResponseHelper.success(userSuccessMessage.UPDATE_PROFILE, mappedData)
      }
   }
}