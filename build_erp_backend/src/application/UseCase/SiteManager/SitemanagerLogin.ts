import { ISitemanagerLoginUseCase } from "../../IUseCases/ISitemanager/ISitemanagerLogin"
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { ISitemanagerRepository } from "../../../domain/Entities/IRepository/ISitemanager"
import { IJwtService } from "../../../domain/Entities/Service.Entities/IJwtservice"
import { IHasher } from "../../../domain/Entities/IRepository/IHasher"
import { commonOutput } from "../../dto/common"
import { ISitemanagerModelEntity } from "../../../domain/Entities/modelEntities/sitemanager.entity"
import { Tokens } from "../../Entities/token.entity"
import { Role } from "../../../Shared/Constants/Role.constant"

export class SitemanagerLoginUseCase implements ISitemanagerLoginUseCase {
   constructor(
      private _sitemanagerRepository: ISitemanagerRepository,
      private _jwtService: IJwtService,
      private _Hasher: IHasher
   ) { }
   async execute(email: string, password: string):
      Promise<commonOutput<{ data: ISitemanagerModelEntity, token: Tokens }> | commonOutput> {
      const existSitemanager = await this._sitemanagerRepository.getSitemanagerByEmail(email)
      if (!existSitemanager) {
         return ResponseHelper.badRequest(SitemanagerFailedMessage.INVALID_EMAIL)
      }
      const passwordCheck = await this._Hasher.compare(password, existSitemanager.password)
      if (!passwordCheck) {
         return ResponseHelper.badRequest(SitemanagerFailedMessage.INVALID_PASSWORD)
      }
      const token = this._jwtService.generateTokens(existSitemanager._id, existSitemanager.email, Role.SITEMANAGER)
      return ResponseHelper.success(SitemanagerSuccessMessage.LOGIN, { data: existSitemanager, token })
   }
}