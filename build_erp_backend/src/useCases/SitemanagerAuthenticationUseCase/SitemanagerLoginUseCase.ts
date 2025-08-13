import { commonOutput } from "../../DTO/CommonEntities/common"
import { IHasherEntity } from "../../Entities/repositoryEntities/Auth-management/IHasher"
import { ISitemanagerRepositoryEntity } from "../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { IJwtServiceEntity } from "../../Entities/Service.Entities/IToken.Entity"
import { ISitemanagerLoginUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/SitemanagerLoginEntity"
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from "../../Shared/Messages/Sitemanager.Message"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"


export class SitemanagerLoginUseCase implements ISitemanagerLoginUseCaseEntity {
   private sitemanagerRepository: ISitemanagerRepositoryEntity
   private jwtService: IJwtServiceEntity
   private Hasher: IHasherEntity
   constructor(sitemanagerRepository: ISitemanagerRepositoryEntity, jwtService: IJwtServiceEntity, Hasher: IHasherEntity) {
      this.sitemanagerRepository = sitemanagerRepository
      this.jwtService = jwtService
      this.Hasher = Hasher
   }
   async execute(email: string, password: string): Promise<commonOutput> {
      const existSitemanager = await this.sitemanagerRepository.findSitemanagerByEmail(email)
      if (!existSitemanager) {
         return ResponseHelper.badRequest(SitemanagerFailedMessage.INVALID_EMAIL)
      }
      const passwordCheck = await this.Hasher.compare(password, existSitemanager.password)
      if (!passwordCheck) {
         return ResponseHelper.badRequest(SitemanagerFailedMessage.INVALID_PASSWORD)
      }
      const token = this.jwtService.generateTokens(existSitemanager._id, existSitemanager.email, "sitemanager")
      return ResponseHelper.loginSuccess(SitemanagerSuccessMessage.LOGIN, token, existSitemanager)
   }
}