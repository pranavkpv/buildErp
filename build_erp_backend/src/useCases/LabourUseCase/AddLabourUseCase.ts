import { commonOutput } from "../../DTO/CommonEntities/common"
import { IAddLabourUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/AddLabourEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { inputLabour } from "../../DTO/LabourEntities/labour"
import { ILabourRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/ILabourRepository"
import { LabourFailedMessage, LabourSuccessMessage } from "../../Shared/Messages/Labour.Message"


export class AddLabourUseCase implements IAddLabourUseCaseEntity {
   private labourRepository: ILabourRepositoryEntity
   constructor(labourRepository: ILabourRepositoryEntity) {
      this.labourRepository = labourRepository
   }
   async execute(input: inputLabour): Promise<commonOutput> {
      const { labour_type, daily_wage } = input
      const existLabourData = await this.labourRepository.findLabourByType(labour_type)
      if (existLabourData) {
         return ResponseHelper.conflictData(LabourFailedMessage.EXIST_LABOUR)
      }
      await this.labourRepository.saveLabour({labour_type, daily_wage})
      return ResponseHelper.createdSuccess(LabourSuccessMessage.ADD)
   }
}


