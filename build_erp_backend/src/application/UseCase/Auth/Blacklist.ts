import { IUserRepository } from "../../../domain/Entities/IRepository/IUser";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { IBlackListUseCase } from "../../IUseCases/IAuth/IBlackList";

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