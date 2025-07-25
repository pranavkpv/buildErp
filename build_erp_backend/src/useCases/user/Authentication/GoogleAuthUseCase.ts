import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { JwtServiceImpl } from "../../../services/JwtService";
import { Profile } from "passport-google-oauth20";
import { IgooglAuthUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/GoogleAuthEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";

export class googlAuthUseCase implements IgooglAuthUseCase {
   private jwtService : JwtServiceImpl
   private userRepository: IUserRepository
   constructor(userRepository: IUserRepository,jwtService : JwtServiceImpl) {
      this.userRepository = userRepository
      this.jwtService = jwtService
   }
    async execute(profile: Profile): Promise<commonOutput> {
    const email = profile.emails?.[0].value || "";
    const username = profile.displayName || "google-user";
    const googleId = profile.id;
    let user = await this.userRepository.findUserBygoogleId(googleId);
    if (user) {
       const tokens = this.jwtService.generateTokens(user._id,user.email,"user")

      return  ResponseHelper.loginSuccess(SUCCESS_MESSAGE.USER.LOGIN,HTTP_STATUS.OK,tokens)
    }     
    await this.userRepository.createUser(username,email,googleId);
    return ResponseHelper.success(SUCCESS_MESSAGE.USER.REGISTER,HTTP_STATUS.CREATED)
  }
}