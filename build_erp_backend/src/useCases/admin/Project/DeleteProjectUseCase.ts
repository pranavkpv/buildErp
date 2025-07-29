import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IDeleteProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DeleteProjectEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository"
import { IProjectStockRepository } from "../../../Entities/repositoryEntities/Stock-management/IProjectStockRepository"
import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository"


export class DeleteProjectUseCase implements IDeleteProjectUseCase {
   private projectRepository: IprojectRepository
   private projectStockRepository:IProjectStockRepository
   private estimationRepository : IEstimationRepository
   constructor(projectRepository: IprojectRepository,projectStockRepository:IProjectStockRepository,
    estimationRepository : IEstimationRepository
   ) {
      this.projectRepository = projectRepository
      this.projectStockRepository = projectStockRepository
      this.estimationRepository = estimationRepository
   }
   async execute(_id:string): Promise<commonOutput> {
     try {
      const existProjectInMaterial = await this.projectStockRepository.findProjectStockById(_id)
      const existProjectInEstimation = await this.estimationRepository.findEstimationByProjectId(_id)
      if(existProjectInMaterial || existProjectInEstimation){
        return ResponseHelper.failure(ERROR_MESSAGE.PROJECT.ALREADY_USED,HTTP_STATUS.CONFLICT)
      }
       await this.projectRepository.DeleteProjectById(_id)
      return ResponseHelper.success(SUCCESS_MESSAGE.PROJECT.DELETE,HTTP_STATUS.OK)
     } catch (error:any) {
       return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
     }
   }
}
