import { IAdminLoginUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/DashboardUseCaseEntities/AdminLoginEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IAdminRepositoryEntity } from "../../../domain/interfaces/Admin-management/IAdminRepository"
import { JwtService } from "../../services/JwtService"
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message"
import { commonOutput } from "../../dto/common"
import { inputAdmin } from "../../entities/admin.entity"
import { IAdminModelEntity } from "../../../domain/Entities/modelEntities/admin.entity"
import { Tokens } from "../../entities/token.entity"


export class AdminLoginUseCase implements IAdminLoginUseCaseEntity {
   private adminRepository: IAdminRepositoryEntity
   private jwtservice: JwtService
   constructor(adminRepository: IAdminRepositoryEntity, jwtservice: JwtService) {
      this.adminRepository = adminRepository
      this.jwtservice = jwtservice
   }
   async execute(input: inputAdmin): Promise<commonOutput<{data:IAdminModelEntity,token:Tokens}> | commonOutput> {
      const existAdmin = await this.adminRepository.findAdminByUsernameAndPassword(input)
      if (!existAdmin) {
         return ResponseHelper.conflictData(userFailedMessage.INVALID_USER)
      }
      const token = this.jwtservice.generateTokens(existAdmin._id, existAdmin.username, "admin")
      return ResponseHelper.success(userSuccessMessage.LOGIN, {data:existAdmin,token})
   }
}
