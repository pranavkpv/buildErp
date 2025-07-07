import { IAdminRepository } from "../../../domain/repositories/IAdminRepository"
import { adminloginInput, adminloginOutput } from "../../../domain/types/admin"
import { AdminJwtServiceImpl } from "../../../services/adminJwtService"


export class AdminLoginUseCase{
   private adminRepository : IAdminRepository
   private jwtservice : AdminJwtServiceImpl
   constructor(adminRepository : IAdminRepository,jwtservice : AdminJwtServiceImpl){
      this.adminRepository = adminRepository
      this.jwtservice = jwtservice
   }
   async execute(input:adminloginInput):Promise<adminloginOutput>{
      const {username,password} = input

      const existAdmin = await this.adminRepository.findAdminByUsernameAndPassword(username,password)
      if(!existAdmin){
          return {success:false , message:"The username or password you entered is invalid."}
      }
      const token = this.jwtservice.generateTokens(existAdmin._id,existAdmin.username)    
      return {success:true,message:"login successfully",token}  
   }
}
