import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { LabourFailedMessage, LabourSuccessMessage } from "../../../Shared/Messages/Labour.Message"
import { IDeleteLabourUseCase } from "../../interfaces/AdminUseCaseEntities/LabourUseCaseEntities/DeleteLabourEntity"
import { ILabourRepository } from "../../../domain/interfaces/Labour-management/ILabourRepository"
import { ISpecRepository } from "../../../domain/interfaces/Estimation-management/ISpecRepository"
import { commonOutput } from "../../dto/common"


export class DeleteLabourUseCase implements IDeleteLabourUseCase {

   constructor(
      private _labourRepository: ILabourRepository,
      private _specRepository: ISpecRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      const existSpec = await this._specRepository.findSpecByLabourId(_id)
      if (existSpec) {
         return ResponseHelper.conflictData(LabourFailedMessage.EXIST_SPEC)
      }
      await this._labourRepository.deleteLabourById(_id)
      return ResponseHelper.success(LabourSuccessMessage.DELETE)
   }
}