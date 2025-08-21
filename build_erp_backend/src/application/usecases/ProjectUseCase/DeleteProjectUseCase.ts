
import { IEstimationRepository } from "../../../domain/interfaces/Estimation-management/IEstimationRepository"
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository"
import { IProjectStockRepository } from "../../../domain/interfaces/Stock-management/IProjectStockRepository"
import { ProjectFailedMessage, ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { IDeleteProjectUseCase } from "../../interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/DeleteProjectEntity"


export class DeleteProjectUseCase implements IDeleteProjectUseCase {
  constructor(
    private _projectRepository: IprojectRepository,
    private _projectStockRepository: IProjectStockRepository,
    private _estimationRepository: IEstimationRepository
  ) { }
  async execute(_id: string): Promise<commonOutput> {
    const existProjectInMaterial = await this._projectStockRepository.findProjectStockById(_id)
    const existProjectInEstimation = await this._estimationRepository.findEstimationByProjectId(_id)
    if (existProjectInMaterial || existProjectInEstimation) {
      return ResponseHelper.conflictData(ProjectFailedMessage.ALREADY_USED)
    }
    await this._projectRepository.DeleteProjectById(_id)
    return ResponseHelper.success(ProjectSuccessMessage.DELETE)
  }
}
