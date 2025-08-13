import { commonOutput } from "../../DTO/CommonEntities/common"
import { changePasswordInput } from "../../DTO/SitemanagerEntities/sitemanager"
import { IHasherEntity } from "../../Entities/repositoryEntities/Auth-management/IHasher"
import { ISitemanagerRepositoryEntity } from "../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { IUpdateSitemanagerPasswordUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/UpdateSitemanagerPasswordEntity"
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from "../../Shared/Messages/Sitemanager.Message"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"



export class UpdateSitemanagerPasswordUseCase implements IUpdateSitemanagerPasswordUseCaseEntity {
   private sitemanagerRepository: ISitemanagerRepositoryEntity
   private hasher: IHasherEntity
   constructor(sitemanagerRepository: ISitemanagerRepositoryEntity, hasher: IHasherEntity) {
      this.sitemanagerRepository = sitemanagerRepository
      this.hasher = hasher
   }
   async execute(input: changePasswordInput): Promise<commonOutput> {
      const { _id, password, changedpassword } = input
      const loginData = await this.sitemanagerRepository.findSitemanagerById(_id)
      if (!loginData) {
         return ResponseHelper.badRequest(SitemanagerFailedMessage.NOT_EXIST)
      }
      const passwordCheck = await this.hasher.compare(password, loginData?.password)
      if (!passwordCheck) {
         return ResponseHelper.badRequest(SitemanagerFailedMessage.PASSWORD_WRONG)
      }
      const hashPassword = await this.hasher.hash(changedpassword)
      await this.sitemanagerRepository.updatePassword({ _id, password: hashPassword })
      return ResponseHelper.success(SitemanagerSuccessMessage.UPDATE_PASSWORD)
   }
}