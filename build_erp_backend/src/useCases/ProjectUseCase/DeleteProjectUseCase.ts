import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { IDeleteProjectUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DeleteProjectEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { IProjectStockRepositoryEntity } from "../../Entities/repositoryEntities/Stock-management/IProjectStockRepository"
import { IEstimationRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/IEstimationRepository"
import { ProjectFailedMessage, ProjectSuccessMessage } from "../../Shared/Messages/Project.Message"


export class DeleteProjectUseCase implements IDeleteProjectUseCaseEntity {
  private projectRepository: IprojectRepositoryEntity
  private projectStockRepository: IProjectStockRepositoryEntity
  private estimationRepository: IEstimationRepositoryEntity
  constructor(projectRepository: IprojectRepositoryEntity, projectStockRepository: IProjectStockRepositoryEntity,
    estimationRepository: IEstimationRepositoryEntity
  ) {
    this.projectRepository = projectRepository
    this.projectStockRepository = projectStockRepository
    this.estimationRepository = estimationRepository
  }
  async execute(_id: string): Promise<commonOutput> {
    const existProjectInMaterial = await this.projectStockRepository.findProjectStockById(_id)
    const existProjectInEstimation = await this.estimationRepository.findEstimationByProjectId(_id)
    if (existProjectInMaterial || existProjectInEstimation) {
      return ResponseHelper.conflictData(ProjectFailedMessage.ALREADY_USED)
    }
    await this.projectRepository.DeleteProjectById(_id)
    return ResponseHelper.success(ProjectSuccessMessage.DELETE)
  }
}
