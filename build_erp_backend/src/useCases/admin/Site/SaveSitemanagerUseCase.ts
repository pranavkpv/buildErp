import { ISitemanagerRepository } from "../../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { addsitemanagerInput } from "../../../Entities/Input-OutputEntities/SitemanagerEntities/sitemanager"
import { hashedPassword } from "../../../Shared/utils/hash"
import { sendEmail } from "../../../Shared/utils/sendEmail"
import { ISaveSitemanagerUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/SaveSitemanagerEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class SaveSitemanagerUseCase implements ISaveSitemanagerUseCase {
   private SitemanagerRepository: ISitemanagerRepository
   constructor(SitemanagerRepository: ISitemanagerRepository) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(input: addsitemanagerInput): Promise<commonOutput> {
      try {
         const { username, email } = input
         const existSitemanager = await this.SitemanagerRepository.findSitemanagerByEmail(email)
         if (existSitemanager) {
            return ResponseHelper.failure(ERROR_MESSAGE.SITEMANAGER.EXIST, HTTP_STATUS.CONFLICT)
         }
         const password = await this.SitemanagerRepository.generatePassword()
         const text = `Dear ${ username }, your temporary password for BuildERP is: ${ password }. Please log in using this password. For security reasons, it's recommended to change your password after logging in.`;
         const emailSend = await sendEmail(email, "Login Password", text)
         const hashpassword = await hashedPassword(String(password))
         console.log(password)
         if (emailSend) {
            await this.SitemanagerRepository.saveSitemanager(username, email, hashpassword)
            return ResponseHelper.success(SUCCESS_MESSAGE.SITEMANAGER.ADD, HTTP_STATUS.CREATED)
         } else {
            return ResponseHelper.failure(ERROR_MESSAGE.SITEMANAGER.FAIL, HTTP_STATUS.BAD_REQUEST)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}
