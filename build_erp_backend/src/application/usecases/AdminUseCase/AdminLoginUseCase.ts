import { commonOutput } from "../../dto/CommonEntities/common"
import { IAdminLoginUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/DashboardUseCaseEntities/AdminLoginEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IAdminRepositoryEntity } from "../../../domain/interfaces/Admin-management/IAdminRepository"
import { JwtService } from "../../services/JwtService"
import { inputAdmin } from "../../dto/AdminEntities/admin"
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message"


export class AdminLoginUseCase implements IAdminLoginUseCaseEntity {
   private adminRepository: IAdminRepositoryEntity
   private jwtservice: JwtService
   constructor(adminRepository: IAdminRepositoryEntity, jwtservice: JwtService) {
      this.adminRepository = adminRepository
      this.jwtservice = jwtservice
   }
   async execute(input: inputAdmin): Promise<commonOutput> {
      const existAdmin = await this.adminRepository.findAdminByUsernameAndPassword(input)
      if (!existAdmin) {
         return ResponseHelper.conflictData(userFailedMessage.INVALID_USER)
      }
      const token = this.jwtservice.generateTokens(existAdmin._id, existAdmin.username, "admin")
      return ResponseHelper.loginSuccess(userSuccessMessage.LOGIN, token, existAdmin)
   }
}
