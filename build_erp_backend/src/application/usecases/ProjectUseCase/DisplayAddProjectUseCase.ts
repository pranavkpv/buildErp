import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { userSuccessMessage } from "../../../Shared/Messages/User.Message"
import { IUserRepository } from "../../../domain/interfaces/User-management/IUserRepository"
import { commonOutput } from "../../dto/common"
import { userLoginDTO } from "../../dto/user.dto"
import { IUserMapper } from "../../../domain/mappers/IUser.mapper"
import { IDisplayAddProjectUseCase } from "../../interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAddProjectEntity"


export class DisplayAddProjectUseCase implements IDisplayAddProjectUseCase {
   
   constructor(
      private _userRepository: IUserRepository,
      private _userMapper: IUserMapper
   ) { }
   async execute(): Promise<commonOutput<userLoginDTO[]> | commonOutput> {
      const userData = await this._userRepository.getAllUsers()
      const mappedUser = this._userMapper.touserDisplayDTO(userData)
      return ResponseHelper.success(userSuccessMessage.FETCH, mappedUser)
   }
}
