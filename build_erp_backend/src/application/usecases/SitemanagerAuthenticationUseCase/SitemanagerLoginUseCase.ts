import { ISitemanagerLoginUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/SitemanagerLoginEntity"
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { ISitemanagerRepository } from "../../../domain/interfaces/Site-management/ISitemanagerRepository"
import { IJwtService } from "../../../domain/Entities/Service.Entities/IJwtservice"
import { IHasher } from "../../../domain/interfaces/Auth-management/IHasher"
import { commonOutput } from "../../dto/common"
import { ISitemanagerModelEntity } from "../../../domain/Entities/modelEntities/sitemanager.entity"
import { Tokens } from "../../entities/token.entity"

export class SitemanagerLoginUseCase implements ISitemanagerLoginUseCaseEntity {
   constructor(
      private sitemanagerRepository: ISitemanagerRepository,
      private jwtService: IJwtService,
      private Hasher: IHasher
   ) { }
   async execute(email: string, password: string):Promise<commonOutput<{data:ISitemanagerModelEntity,token:Tokens}> | commonOutput> {
      const existSitemanager = await this.sitemanagerRepository.findSitemanagerByEmail(email)
      if (!existSitemanager) {
         return ResponseHelper.badRequest(SitemanagerFailedMessage.INVALID_EMAIL)
      }
      const passwordCheck = await this.Hasher.compare(password, existSitemanager.password)
      if (!passwordCheck) {
         return ResponseHelper.badRequest(SitemanagerFailedMessage.INVALID_PASSWORD)
      }
      const token = this.jwtService.generateTokens(existSitemanager._id, existSitemanager.email, "sitemanager")
      return ResponseHelper.success(SitemanagerSuccessMessage.LOGIN,{data:existSitemanager,token})
   }
}