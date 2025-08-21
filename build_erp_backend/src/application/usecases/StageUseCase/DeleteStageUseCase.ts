
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { StageFailedMessage, StageSuccessMessage } from "../../../Shared/Messages/Stage.Message";
import { IDeleteStageUseCase } from "../../interfaces/AdminUseCaseEntities/StageUseCaseEntities/DeleteStageEntity";
import { IStageRepository } from "../../../domain/interfaces/Project-management/IStageRepository";
import { commonOutput } from "../../dto/common";

export class DeleteStageUseCase implements IDeleteStageUseCase {

   constructor(
      private _stageRepository: IStageRepository
   ) { }
   async execute(_id:string): Promise<commonOutput> {
      const existUpdationOnstage = await this._stageRepository.findStageByprojectId(_id)
      for (let element of existUpdationOnstage) {
         if (element.progress > 0) {
            return ResponseHelper.conflictData(StageFailedMessage.ALREADY_USED)
         }
      }
      await this._stageRepository.RemoveDateinProject(_id)
      await this._stageRepository.DeleteStageByproject(_id)
      return ResponseHelper.success(StageSuccessMessage.DELETE)
   }
}