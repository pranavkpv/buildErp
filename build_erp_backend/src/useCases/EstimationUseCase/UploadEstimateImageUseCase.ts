import { commonOutput } from "../../DTO/CommonEntities/common";
import { IUploadEstimateImageUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/UploadEstimateImageEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { EstimationSuccessMessage } from "../../Shared/Messages/Estimation.Message";


export class UploadEstimateImageUseCase implements IUploadEstimateImageUseCaseEntity {
  private projectRepository: IprojectRepositoryEntity
  constructor(projectRepository: IprojectRepositoryEntity) {
    this.projectRepository = projectRepository
  }
  async execute(url: string, _id: string): Promise<commonOutput> {
    await this.projectRepository.UpdateEstimationImage(url, _id)
    return ResponseHelper.success(EstimationSuccessMessage.UPLOAD)
  }
}