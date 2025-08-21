import { IJwtService } from "../../../domain/Entities/Service.Entities/IJwtservice";
import { IUserRepository } from "../../../domain/interfaces/User-management/IUserRepository";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { IRefreshTokenUseCase } from "../../interfaces/useCase.Entity/Auth.UseCase/RefreshToken.UseCase.Entity";



export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private JwtService: IJwtService
  ) { }
  async execute(refreshToken: string): Promise<commonOutput<string> | commonOutput> {
    const payload = this.JwtService.verifyRefreshToken(refreshToken);
    if (!payload) throw new Error(userFailedMessage.INVALID_USER);
    const user = await this._userRepository.getUserById(payload._id)
    if (!user) throw new Error(userFailedMessage.USER_NOT_FOUND);
    const accessToken = this.JwtService.createAccessToken({ _id: user._id, username: user.username, role: "user" });
    return ResponseHelper.success(userSuccessMessage.ACCESSTOKEN_CREATE,accessToken)
  }
}