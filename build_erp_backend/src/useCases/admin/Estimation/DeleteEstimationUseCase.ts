import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { IStageRepository } from "../../../Entities/repositoryEntities/Project-management/IStageRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IDeleteEstimationUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/DeleteEstimationEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";


export class DeleteEstimationUseCase implements IDeleteEstimationUseCase{
   private estimationRepository : IEstimationRepository
   private stageRepository : IStageRepository
   constructor( estimationRepository : IEstimationRepository,stageRepository : IStageRepository){
      this.estimationRepository = estimationRepository
      this.stageRepository = stageRepository
   }
   async execute(_id:string):Promise<commonOutput>{
       const existStage = await this.stageRepository.findStageByprojectId(_id)
       if(existStage){
         return ResponseHelper.failure(ERROR_MESSAGE.ESTIMATION.USED_STAGE,HTTP_STATUS.CONFLICT)
       }
       await this.estimationRepository.deleteEstimationById(_id)
       return ResponseHelper.success(SUCCESS_MESSAGE.ESTIMATION.DELETE,HTTP_STATUS.OK)
   }
}