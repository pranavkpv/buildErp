
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { SpecFailedMessage, SpecSuccessMessage } from "../../../Shared/Messages/Specification.Message";
import { IDeleteSpecUseCase } from "../../interfaces/AdminUseCaseEntities/SpecUseCaseEntities/DeleteSpecEntity";
import { ISpecRepository } from "../../../domain/interfaces/Estimation-management/ISpecRepository";
import { IEstimationRepository } from "../../../domain/interfaces/Estimation-management/IEstimationRepository";
import { commonOutput } from "../../dto/common";

export class DeleteSpecUseCase implements IDeleteSpecUseCase {
   constructor(
      private _specRepository: ISpecRepository,
      private _estimationRepostory: IEstimationRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const existEstimationBySpec = await this._estimationRepostory.findEstimationBySpecId(_id)
      if (existEstimationBySpec) {
         return ResponseHelper.conflictData(SpecFailedMessage.USED_ESTIMATION)
      }
      await this._specRepository.DeleteSpec(_id)
      return ResponseHelper.success(SpecSuccessMessage.DELETE)
   }
}