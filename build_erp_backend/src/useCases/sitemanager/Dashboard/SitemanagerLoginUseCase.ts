import { IHasher } from "../../../domain/repositories/IHasher"
import { ISitemanagerRepository } from "../../../domain/repositories/ISitemanagerRepository"
import { outputProject } from "../../../domain/types/project"
import { JwtService } from "../../../services/JwtService"


export class SitemanagerLoginUseCase{
   private sitemanagerRepository : ISitemanagerRepository
   private jwtService : JwtService
   private Hasher : IHasher
   constructor(sitemanagerRepository : ISitemanagerRepository,jwtService : JwtService,Hasher : IHasher){
      this.sitemanagerRepository = sitemanagerRepository
      this.jwtService = jwtService
      this.Hasher = Hasher
   }
   async execute(email:string,password:string):Promise<outputProject>{
      const existSitemanager = await this.sitemanagerRepository.findSitemanagerByEmail(email)
      if(!existSitemanager){
         return {
            success:false,
            message:"Invalid email address. Please try again."
         }
      }
      const passwordCheck = await this.Hasher.compare(password, existSitemanager.password)
       if (!passwordCheck) {
         return {
            success: false,
            message: "Invalid password. Please try again."
         }
      }
      
      const token = this.jwtService.generateTokens(existSitemanager._id,existSitemanager.email)
      return {
         success:true,
         message:"login successfully",
         token,
         existSitemanager
      }
   }
}