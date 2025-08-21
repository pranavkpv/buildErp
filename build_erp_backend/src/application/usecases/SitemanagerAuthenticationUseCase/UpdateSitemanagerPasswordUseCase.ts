
import { IHasher } from "../../../domain/interfaces/Auth-management/IHasher"
import { ISitemanagerRepository } from "../../../domain/interfaces/Site-management/ISitemanagerRepository"
import { IUpdateSitemanagerPasswordUseCase } from "../../interfaces/SitemanagerUseCaseEntities/AuthenticationUsecaseEntities/UpdateSitemanagerPasswordEntity"
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { changePasswordInput } from "../../entities/sitemanager.entity"
import { commonOutput } from "../../dto/common"



export class UpdateSitemanagerPasswordUseCase implements IUpdateSitemanagerPasswordUseCase {
   constructor(
      private sitemanagerRepository: ISitemanagerRepository,
      private hasher: IHasher
   ) { }
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