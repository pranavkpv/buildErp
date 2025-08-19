import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { LabourFailedMessage, LabourSuccessMessage } from "../../../Shared/Messages/Labour.Message"
import { IAddLabourUseCase } from "../../interfaces/AdminUseCaseEntities/LabourUseCaseEntities/AddLabourEntity"
import { ILabourRepository } from "../../../domain/interfaces/Labour-management/ILabourRepository"
import { labourAddInput } from "../../entities/labour.entity"
import { commonOutput } from "../../dto/common"


export class AddLabourUseCase implements IAddLabourUseCase {
   constructor( 
      private _labourRepository: ILabourRepository
   ) { }
   async execute(input: labourAddInput): Promise<commonOutput> {
      const { labour_type, daily_wage } = input
      const existLabourData = await this._labourRepository.findLabourByType(labour_type)
      if (existLabourData) {
         return ResponseHelper.conflictData(LabourFailedMessage.EXIST_LABOUR)
      }
      await this._labourRepository.saveLabour(input)
      return ResponseHelper.createdSuccess(LabourSuccessMessage.ADD)
   }
}


