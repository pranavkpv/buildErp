import { Tokens } from "../../dto/AuthEntities/auth";
import { IAdminRefreshTokenUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/DashboardUseCaseEntities/AdminRefreshTokenEntity";
import { commonOutput } from "../../dto/CommonEntities/common";
import { IAdminRepositoryEntity } from "../../../domain/interfaces/Admin-management/IAdminRepository";
import { JwtService } from "../../services/JwtService";
import { AuthErrorMessage } from "../../../Shared/Messages/Auth.Message";



export class RefreshTokenUseCase implements IAdminRefreshTokenUseCaseEntity {
  private AdminRepository: IAdminRepositoryEntity
  private JwtService: JwtService;
  constructor(JwtService: JwtService, AdminRepository: IAdminRepositoryEntity) {
    this.AdminRepository = AdminRepository
    this.JwtService = JwtService;
  }

  async execute(refreshToken: string): Promise<Tokens | commonOutput> {
    const payload = this.JwtService.verifyRefreshToken(refreshToken);
    if (!payload) throw new Error(AuthErrorMessage.INVALID_REFRESH_TOKEN);
    const admin = await this.AdminRepository.findAdminById(payload.userId);
    if (!admin) throw new Error('User not found');
    return this.JwtService.generateTokens(admin._id, admin.username, "admin");
  }
}