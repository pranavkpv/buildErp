import { IAdminRepositoryEntity } from "../../../domain/interfaces/Admin-management/IAdminRepository";
import { ISitemanagerRepositoryEntity } from "../../../domain/interfaces/Site-management/ISitemanagerRepository";
import { IUserRepositoryEntity } from "../../../domain/interfaces/User-management/IUserRepository";
import { IJwtServiceEntity } from "../../../domain/Entities/Service.Entities/IJwtservice";
import { IRefreshTokenUseCaseEntity } from "../../interfaces/useCase.Entity/Auth.UseCase/RefreshToken.UseCase.Entity";
import { AuthErrorMessage } from "../../../Shared/Messages/Auth.Message";

export class RefreshTokenUseCase implements IRefreshTokenUseCaseEntity {
   private jwtService: IJwtServiceEntity
   private userRepository: IUserRepositoryEntity
   private sitemanagerRepository: ISitemanagerRepositoryEntity
   private adminRepository: IAdminRepositoryEntity
   constructor(jwtService: IJwtServiceEntity, userRepository: IUserRepositoryEntity, sitemanagerRepository: ISitemanagerRepositoryEntity,
      adminRepository: IAdminRepositoryEntity
   ) {
      this.jwtService = jwtService
      this.userRepository = userRepository
      this.sitemanagerRepository = sitemanagerRepository
      this.adminRepository = adminRepository
   }
   async execute(token: string): Promise<string> {
      const payload = await this.jwtService.verifyRefreshToken(token)
      if (!payload) throw new Error(AuthErrorMessage.INVALID_REFRESH_TOKEN)
      const userId = payload.userId
      const existRole = payload.role
      const user = await this.userRepository.findUserById(userId)
      const admin = await this.adminRepository.findAdminById(userId)
      const sitemanager = await this.sitemanagerRepository.findSitemanagerById(userId)
      const person = user || admin || sitemanager
      const role = user ? 'user' : sitemanager ? 'sitemanager' : admin ? 'admin' : null
      if (!person || existRole != role) throw new Error(AuthErrorMessage.NO_USER_EXIST)
      const newAccessToken = await this.jwtService.createAccessToken({ _id: userId, username: person.username, role })
      return newAccessToken
   }
}