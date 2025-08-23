import { IUserRepository } from "../../../domain/interfaces/User-management/IUserRepository";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { IBlackListUseCase } from "../../interfaces/UserUseCaseEntities/AuthenticationUseCaseEntities/IBlackListAccessToken.Usecase";

export class BlackListUsecase implements IBlackListUseCase {
   constructor(
      private _userRepository: IUserRepository
   ) { }
   async execute(accessToken: string): Promise<commonOutput> {
      const response = await this._userRepository.blackListToken(accessToken)
      if(!response){
         return ResponseHelper.conflictData(userFailedMessage.BLACK_LIST_FAIL)
      }
      return ResponseHelper.success(userSuccessMessage.BLACK_LIST_SUCCESS)
   }
}