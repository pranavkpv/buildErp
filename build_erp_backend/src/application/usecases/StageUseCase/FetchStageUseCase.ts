import { IprojectRepositoryEntity } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { IFetchStageUsecaseEntity } from "../../interfaces/AdminUseCaseEntities/StageUseCaseEntities/FetchStageEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/CommonEntities/common";
import { projectOutput } from "../../dto/ProjectEntities/project";
import { StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";

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