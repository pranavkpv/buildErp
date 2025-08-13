import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IFetchStageUsecaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/FetchStageEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { projectOutput } from "../../DTO/ProjectEntities/project";
import { StageSuccessMessage } from "../../Shared/Messages/Stage.Message";

export class FetchStageUsecase implements IFetchStageUsecaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(search: string, page: number): Promise<projectOutput | commonOutput> {
         const {data,totalPage} = await this.projectRepository.findStageSetProject({page,search})
         return ResponseHelper.success(StageSuccessMessage.FETCH,data,totalPage)
   }
}