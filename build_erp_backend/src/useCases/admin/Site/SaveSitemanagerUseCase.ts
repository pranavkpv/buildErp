import { ISitemanagerRepository } from "../../../domain/repositories/ISitemanagerRepository"
import { addsitemanagerInput, OutPutSitemanager } from "../../../domain/types/sitemanager"
import { hashedPassword } from "../../../infrastructure/utils/hash"
import { sendEmail } from "../../../infrastructure/utils/sendEmail"


export class SaveSitemanagerUseCase {
   private SitemanagerRepository: ISitemanagerRepository
   constructor(SitemanagerRepository: ISitemanagerRepository) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(input: addsitemanagerInput): Promise<OutPutSitemanager> {
      const { username, email } = input
      const existSitemanager = await this.SitemanagerRepository.findSitemanagerByEmail(email)
      if (existSitemanager) {
         return { success: false, message: "Sitemanager already exist" }
      }
      const password = await this.SitemanagerRepository.generatePassword()

      const text = `Dear ${ username }, your temporary password for BuildERP is: ${ password }. Please log in using this password. For security reasons, it's recommended to change your password after logging in.`;
      const emailSend = await sendEmail(email, "Login Password", text)
      const hashpassword = await hashedPassword(String(password))
      console.log(password)
      if (emailSend) {
         await this.SitemanagerRepository.saveSitemanager(username, email, hashpassword)
         return { success: true, message: "Sitemanager registered successfully" }
      }else{
         return {success:false,message:"Sitemanager registered fail"}
      }
    
   }
}
