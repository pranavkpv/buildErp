import { ISitemanagerRepositoryEntity } from "../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { saveSitemanagerInput } from "../../DTO/SitemanagerEntities/sitemanager"
import { hashedPassword } from "../../Shared/utils/hash"
import { sendEmail } from "../../Shared/utils/sendEmail"
import { ISaveSitemanagerUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/SaveSitemanagerEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from "../../Shared/Messages/Sitemanager.Message"


export class SaveSitemanagerUseCase implements ISaveSitemanagerUseCaseEntity {
   private SitemanagerRepository: ISitemanagerRepositoryEntity
   constructor(SitemanagerRepository: ISitemanagerRepositoryEntity) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(input: saveSitemanagerInput): Promise<commonOutput> {
      const { username, email } = input
      const existSitemanager = await this.SitemanagerRepository.findSitemanagerByEmail(email)
      if (existSitemanager) {
         return ResponseHelper.conflictData(SitemanagerFailedMessage.EXIST)
      }
      const password = await this.SitemanagerRepository.generatePassword()
      const text = `Dear ${ username }, your temporary password for BuildERP is: ${ password }. Please log in using this password. For security reasons, it's recommended to change your password after logging in.`;
      const emailSend = await sendEmail(email, "Login Password", text)
      const hashpassword = await hashedPassword(String(password))
      console.log(password)
      if (!emailSend) {
         return ResponseHelper.badRequest(SitemanagerFailedMessage.EMAIL_SEND_FAIL)
      }
      await this.SitemanagerRepository.saveSitemanager({ username, email, password: hashpassword })
      return ResponseHelper.createdSuccess(SitemanagerSuccessMessage.SAVED)
   }
}
