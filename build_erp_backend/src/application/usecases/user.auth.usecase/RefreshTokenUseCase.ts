import { IJwtServiceEntity } from '../../../domain/Entities/Service.Entities/IJwtservice';
import { IUserRepositoryEntity } from '../../../domain/interfaces/User-management/IUserRepository';
import { Tokens } from '../../dto/AuthEntities/auth';
import { IRefreshTokenUseCaseEntity } from '../../interfaces/UserUseCaseEntities/AuthenticationUseCaseEntities/RefreshTokenEntity';
import { commonOutput } from '../../dto/CommonEntities/common';
import { userFailedMessage } from '../../../Shared/Messages/User.Message';


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