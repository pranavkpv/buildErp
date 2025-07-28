import { IHasher } from "../../../Entities/repositoryEntities/Auth-management/IHasher"
import { JwtService } from "../../../Entities/repositoryEntities/Auth-management/IToken"
import { ISitemanagerRepository } from "../../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { ISitemanagerLoginUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/SitemanagerLoginEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"



export class SitemanagerLoginUseCase implements ISitemanagerLoginUseCase {
   private sitemanagerRepository: ISitemanagerRepository
   private jwtService: JwtService
   private Hasher: IHasher
   constructor(sitemanagerRepository: ISitemanagerRepository, jwtService: JwtService, Hasher: IHasher) {
      this.sitemanagerRepository = sitemanagerRepository
      this.jwtService = jwtService
      this.Hasher = Hasher
   }
   async execute(email: string, password: string): Promise<commonOutput> {
      try {
         const existSitemanager = await this.sitemanagerRepository.findSitemanagerByEmail(email)
         if (!existSitemanager) {
            return ResponseHelper.failure(ERROR_MESSAGE.SITEMANAGER.INVALID_EMAIL, HTTP_STATUS.UNAUTHORIZED)
         }
         const passwordCheck = await this.Hasher.compare(password, existSitemanager.password)
         if (!passwordCheck) {
            return ResponseHelper.failure(ERROR_MESSAGE.SITEMANAGER.INVALID_PASSWORD, HTTP_STATUS.UNAUTHORIZED)
         }

         const token = this.jwtService.generateTokens(existSitemanager._id, existSitemanager.email, "sitemanager")
         return ResponseHelper.loginSuccess(SUCCESS_MESSAGE.USER.LOGIN, HTTP_STATUS.OK, token, existSitemanager)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}