
import { JwtService } from '../../../Entities/repositoryEntities/Auth-management/IToken';
import { IUserRepository } from '../../../Entities/repositoryEntities/User-management/IUserRepository';
import { Tokens } from '../../../Entities/Input-OutputEntities/auth';
import { IRefreshTokenUseCase } from '../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/RefreshTokenEntity';
import { ERROR_MESSAGE } from '../../../Shared/Message';
import { ResponseHelper } from '../../../Shared/utils/response';
import { HTTP_STATUS } from '../../../Shared/Status_code';
import { commonOutput } from '../../../Entities/Input-OutputEntities/CommonEntities/common';


export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  private UserRepository: IUserRepository;
  private JwtService: JwtService;
  constructor(UserRepository: IUserRepository, JwtService: JwtService) {
    this.UserRepository = UserRepository;
    this.JwtService = JwtService;
  }
  async execute(refreshToken: string): Promise<Tokens | commonOutput> {
    try {
      const payload = this.JwtService.verifyRefreshToken(refreshToken);
      if (!payload) throw new Error(ERROR_MESSAGE.USER.INVALID_REFRESH_TOKEN);

      const user = await this.UserRepository.findUserById(payload._id)
      if (!user) throw new Error(ERROR_MESSAGE.USER.USER_NOT_FOUND);

      return this.JwtService.generateTokens(user._id, user.email, "user");
    } catch (error:any) {
      return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  }
}