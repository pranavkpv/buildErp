import { IJwtService } from "../../../domain/Entities/Service.Entities/IJwtservice";
import { IAdminRepositoryEntity } from "../../../domain/interfaces/Admin-management/IAdminRepository";
import { ISitemanagerRepository } from "../../../domain/interfaces/Site-management/ISitemanagerRepository";
import { IUserRepository } from "../../../domain/interfaces/User-management/IUserRepository";
import { Role } from "../../../Shared/Constants/Role.constant";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { IRefreshTokenUseCase } from "../../interfaces/useCase.Entity/Auth.UseCase/RefreshToken.UseCase.Entity";



export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private JwtService: IJwtService,
    private _adminRepository: IAdminRepositoryEntity,
    private _sitemanagerRepository: ISitemanagerRepository
  ) { }
  async execute(refreshToken: string): Promise<commonOutput<string> | commonOutput> {
    const payload = this.JwtService.verifyRefreshToken(refreshToken);
    if (!payload) throw new Error(userFailedMessage.INVALID_USER);
    let user;
    if (payload.role == Role.USER) {
      user = await this._userRepository.getUserById(payload._id)
    }else if (payload.role == Role.ADMIN) {
      user = await this._adminRepository.findAdminById(payload._id)
    }else if(payload.role == Role.SITEMANAGER){
      user = await this._sitemanagerRepository.findSitemanagerById(payload._id)
    }else{
      return ResponseHelper.badRequest(userFailedMessage.INVALID_USER)
    }
    if (!user) throw new Error(userFailedMessage.USER_NOT_FOUND);
    const accessToken = this.JwtService.createAccessToken({ _id: user._id, username: user.username, role: payload.role });
    return ResponseHelper.success(userSuccessMessage.ACCESSTOKEN_CREATE, accessToken)
  }
}