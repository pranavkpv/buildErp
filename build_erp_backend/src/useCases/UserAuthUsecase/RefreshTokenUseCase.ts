import { IJwtServiceEntity } from '../../Entities/Service.Entities/IToken.Entity';
import { IUserRepositoryEntity } from '../../Entities/repositoryEntities/User-management/IUserRepository';
import { Tokens } from '../../DTO/AuthEntities/auth';
import { IRefreshTokenUseCaseEntity } from '../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/RefreshTokenEntity';
import { commonOutput } from '../../DTO/CommonEntities/common';
import { userFailedMessage } from '../../Shared/Messages/User.Message';


export class RefreshTokenUseCase implements IRefreshTokenUseCaseEntity {
  private UserRepository: IUserRepositoryEntity;
  private JwtService: IJwtServiceEntity;
  constructor(UserRepository: IUserRepositoryEntity, JwtService: IJwtServiceEntity) {
    this.UserRepository = UserRepository;
    this.JwtService = JwtService;
  }
  async execute(refreshToken: string): Promise<Tokens | commonOutput> {
      const payload = this.JwtService.verifyRefreshToken(refreshToken);
      if (!payload) throw new Error(userFailedMessage.INVALID_USER);
      const user = await this.UserRepository.findUserById(payload.userId)
      if (!user) throw new Error(userFailedMessage.USER_NOT_FOUND);

      return this.JwtService.generateTokens(user._id, user.email, "user");
  }
}