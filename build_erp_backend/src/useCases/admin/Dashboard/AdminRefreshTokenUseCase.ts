import { IAdminRepository } from "../../../Entities/repositoryEntities/Admin-management/IAdminRepository";
import { Tokens } from "../../../Entities/Input-OutputEntities/auth";
import { JwtService } from "../../../Entities/repositoryEntities/Auth-management/IToken";
import { IAdminRefreshTokenUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/AdminRefreshTokenEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";



export class RefreshTokenUseCase implements IAdminRefreshTokenUseCase {
  private AdminRepository: IAdminRepository
  private JwtService: JwtService;
  constructor(JwtService: JwtService, AdminRepository: IAdminRepository) {
    this.AdminRepository = AdminRepository
    this.JwtService = JwtService;
  }

  async execute(refreshToken: string): Promise<Tokens | commonOutput> {
    try {
      const payload = this.JwtService.verifyRefreshToken(refreshToken);
      if (!payload) throw new Error('Invalid refresh token');

      const admin = await this.AdminRepository.findAdminById(payload._id);
      if (!admin) throw new Error('User not found');

      return this.JwtService.generateTokens(admin._id, admin.username, "admin");
    } catch (error: any) {
      return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  }
}