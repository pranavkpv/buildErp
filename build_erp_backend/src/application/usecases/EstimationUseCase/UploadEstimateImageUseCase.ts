import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { EstimationSuccessMessage } from "../../../Shared/Messages/Estimation.Message";
import { IUploadEstimateImageUseCase } from "../../interfaces/AdminUseCaseEntities/EstimationUseCaseEntities/UploadEstimateImageEntity";
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { commonOutput } from "../../dto/common";


export class UploadEstimateImageUseCase implements IUploadEstimateImageUseCase {
  constructor(private _projectRepository: IprojectRepository) { }
  async execute(url: string, _id: string): Promise<commonOutput> {
    await this._projectRepository.UpdateEstimationImage(url, _id)
    return ResponseHelper.success(EstimationSuccessMessage.UPLOAD)
  }
}