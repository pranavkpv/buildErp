import { AdminRepository } from "../infrastructure/persistence/AdminRepository";
import { SitemanagerRepository } from "../infrastructure/persistence/SitemanagerRepository";
import { UserRepository } from "../infrastructure/persistence/UserRepository";
import { RefreshTokenController } from "../infrastructure/web/controllers/Auth/RefreshTokenController";
import { JwtService } from "../services/JwtService";
import { RefreshTokenUseCase } from "../useCases/UserAuthUsecase/RefreshToken.UseCase";

const jwtService = new JwtService()
const adminRepository = new AdminRepository()
const userRepository = new UserRepository()
const sitemanagerRepository = new SitemanagerRepository()
const refreshTokenUseCase = new RefreshTokenUseCase(jwtService,userRepository,sitemanagerRepository,adminRepository)
export const injectedRefreshTokenController = new RefreshTokenController(refreshTokenUseCase)