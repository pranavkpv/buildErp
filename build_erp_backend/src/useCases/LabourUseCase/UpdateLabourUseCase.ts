import { commonOutput } from "../../DTO/CommonEntities/common"
import { IUpdateLabourUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/UpdateLabourEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { inputLabour } from "../../DTO/LabourEntities/labour"
import { ILabourRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/ILabourRepository"
import { LabourFailedMessage, LabourSuccessMessage } from "../../Shared/Messages/Labour.Message"



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