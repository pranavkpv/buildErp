
import { IAdminRepository } from "../../../Entities/repositoryEntities/Admin-management/IAdminRepository"
import { JwtService } from "../../../Entities/repositoryEntities/Auth-management/IToken"
import { adminloginInput } from "../../../Entities/Input-OutputEntities/AdminEntities/admin"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IAdminLoginUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/AdminLoginEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class AdminLoginUseCase implements IAdminLoginUseCase{
   private adminRepository : IAdminRepository
   private jwtservice : JwtService
   constructor(adminRepository : IAdminRepository,jwtservice : JwtService){
      this.adminRepository = adminRepository
      this.jwtservice = jwtservice
   }
   async execute(input:adminloginInput):Promise<commonOutput>{
      const {username,password} = input

      const existAdmin = await this.adminRepository.findAdminByUsernameAndPassword(username,password)
      if(!existAdmin){
          return  ResponseHelper.failure(ERROR_MESSAGE.USER.INVALID_USER,HTTP_STATUS.UNAUTHORIZED)
      }
      const token = this.jwtservice.generateTokens(existAdmin._id,existAdmin.username,"admin")    
      return ResponseHelper.loginSuccess(SUCCESS_MESSAGE.USER.LOGIN,HTTP_STATUS.OK,token)
   }
}
