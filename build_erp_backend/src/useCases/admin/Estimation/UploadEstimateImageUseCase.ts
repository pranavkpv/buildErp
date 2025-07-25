
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IUploadEstimateImageUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/UploadEstimateImageEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";


export class UploadEstimateImageUseCase implements IUploadEstimateImageUseCase{
  private projectRepository : IprojectRepository
   constructor(projectRepository : IprojectRepository){
    this.projectRepository = projectRepository
   }
   async execute(url:string,_id:string):Promise<commonOutput>{
       await this.projectRepository.UpdateEstimationImage(url,_id)
       return ResponseHelper.success(SUCCESS_MESSAGE.ESTIMATION.UPLOAD,HTTP_STATUS.OK)
   }
}