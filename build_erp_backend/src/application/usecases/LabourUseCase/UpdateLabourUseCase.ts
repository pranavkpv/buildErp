import { commonOutput } from "../../dto/CommonEntities/common"
import { IUpdateLabourUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/LabourUseCaseEntities/UpdateLabourEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { inputLabour } from "../../dto/LabourEntities/labour"
import { ILabourRepositoryEntity } from "../../../domain/interfaces/Labour-management/ILabourRepository"
import { LabourFailedMessage, LabourSuccessMessage } from "../../../Shared/Messages/Labour.Message"



export class UpdateLabourUseCase implements IUpdateLabourUseCaseEntity {
   private labourRepository: ILabourRepositoryEntity
   constructor(labourRepository: ILabourRepositoryEntity) {
      this.labourRepository = labourRepository
   }
   async execute(input: inputLabour): Promise<commonOutput> {
      const { _id, labour_type, daily_wage } = input
      const existLabour = await this.labourRepository.findLabourInEdit({ _id, labour_type })
      if (existLabour) {
         return ResponseHelper.conflictData(LabourFailedMessage.EXIST_LABOUR)
      }
      await this.labourRepository.updateLabourById({ _id, labour_type, daily_wage })
      return ResponseHelper.success(LabourSuccessMessage.UPDATE)
   }
}