import { IHasher } from "../../../domain/repositories/IHasher"
import { ISitemanagerRepository } from "../../../domain/repositories/ISitemanagerRepository"
import { changePasswordInput, OutPutSitemanager } from "../../../domain/types/sitemanager"


export class UpdateSitemanagerPasswordUseCase {
   private sitemanagerRepository: ISitemanagerRepository
   private hasher : IHasher
   constructor(sitemanagerRepository: ISitemanagerRepository,hasher : IHasher) {
      this.sitemanagerRepository = sitemanagerRepository
      this.hasher = hasher
   }
   async execute(input: changePasswordInput): Promise<OutPutSitemanager> {
      const { _id,password,changedpassword } = input
      const loginData = await this.sitemanagerRepository.findSitemanagerById(_id)
      if(!loginData){
         return{
            success:false,
            message:"sitemanager not exist"
         }
      }
      const passwordCheck = await this.hasher.compare(password,loginData?.password)
      if(!passwordCheck){
         return {
            success:false,
            message:"entered password is wrong"
         }
      }
      const hashPassword = await this.hasher.hash(changedpassword)
      await this.sitemanagerRepository.updatePassword(_id,hashPassword)
      return {
         success:true,
         message:"password updated successfully"
      }
   }
}