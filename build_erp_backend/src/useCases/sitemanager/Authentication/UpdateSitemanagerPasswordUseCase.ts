import { IHasher } from "../../../Entities/repositoryEntities/Auth-management/IHasher"
import { ISitemanagerRepository } from "../../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { changePasswordInput } from "../../../Entities/Input-OutputEntities/SitemanagerEntities/sitemanager"
import { IUpdateSitemanagerPasswordUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/UpdateSitemanagerPasswordEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class UpdateSitemanagerPasswordUseCase implements IUpdateSitemanagerPasswordUseCase {
   private sitemanagerRepository: ISitemanagerRepository
   private hasher: IHasher
   constructor(sitemanagerRepository: ISitemanagerRepository, hasher: IHasher) {
      this.sitemanagerRepository = sitemanagerRepository
      this.hasher = hasher
   }
   async execute(input: changePasswordInput): Promise<commonOutput> {
      const { _id, password, changedpassword } = input
      const loginData = await this.sitemanagerRepository.findSitemanagerById(_id)
      if (!loginData) {
         return ResponseHelper.failure(ERROR_MESSAGE.SITEMANAGER.NOT_EXIST, HTTP_STATUS.BAD_REQUEST)
      }
      const passwordCheck = await this.hasher.compare(password, loginData?.password)
      if (!passwordCheck) {
         return ResponseHelper.failure(ERROR_MESSAGE.SITEMANAGER.PASSWORD_WRONG, HTTP_STATUS.BAD_REQUEST)
      }
      const hashPassword = await this.hasher.hash(changedpassword)
      await this.sitemanagerRepository.updatePassword(_id, hashPassword)
      return ResponseHelper.success(SUCCESS_MESSAGE.SITEMANAGER.UPDATE_PASSWORD, HTTP_STATUS.OK)
   }
}