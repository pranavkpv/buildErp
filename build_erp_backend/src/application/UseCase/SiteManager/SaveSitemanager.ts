import { ISitemanagerRepository } from "../../../domain/Entities/IRepository/ISitemanager"
import { hashedPassword } from "../../../Shared/utils/hash"
import { sendEmail } from "../../../Shared/utils/sendEmail"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { SitemanagerFailedMessage, SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message"
import { addsitemanagerInput } from "../../Entities/sitemanager.entity"
import { commonOutput } from "../../dto/common"
import { ISaveSitemanagerUseCase } from "../../IUseCases/ISitemanager/ISaveSitemanager"


export class SaveSitemanagerUseCase implements ISaveSitemanagerUseCase { 
   constructor( 
      private _sitemanagerRepository: ISitemanagerRepository
   ) { }
   async execute(input: addsitemanagerInput): Promise<commonOutput> {
      const { username, email } = input
      const existSitemanager = await this._sitemanagerRepository.getSitemanagerByEmail(email)
      if (existSitemanager) {
         return ResponseHelper.conflictData(SitemanagerFailedMessage.EXIST)
      }
      const password = await this._sitemanagerRepository.generateRandomPassword()
      const text = `Dear ${ username }, your temporary password for BuildERP is: ${ password }. Please log in using this password. For security reasons, it's recommended to change your password after logging in.`;
      const emailSend = await sendEmail(email, "Login Password", text)
      const hashpassword = await hashedPassword(String(password))
      console.log(password)
      if (!emailSend) {
         return ResponseHelper.badRequest(SitemanagerFailedMessage.EMAIL_SEND_FAIL)
      }
      await this._sitemanagerRepository.createSitemanager({ username, email, password: hashpassword })
      return ResponseHelper.createdSuccess(SitemanagerSuccessMessage.SAVED)
   }
}
