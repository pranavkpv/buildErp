
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { JwtService } from '../../../services/JwtService';
import { Tokens } from '../../../domain/types/auth';

export class RefreshTokenUseCase {
  private UserRepository: IUserRepository;
  private JwtService: JwtService;

  constructor(UserRepository: IUserRepository, JwtService: JwtService) {
    this.UserRepository = UserRepository;
    this.JwtService = JwtService;
  }

  async execute(refreshToken: string): Promise<Tokens> {
    const payload = this.JwtService.verifyRefreshToken(refreshToken);
    if (!payload) throw new Error('Invalid refresh token');

    const user = await this.UserRepository.findUserById(payload._id)
    if (!user) throw new Error('User not found');

    return this.JwtService.generateTokens( user._id, user.email );
  }
}