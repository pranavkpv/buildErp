import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { addLabourInput } from "../../../Entities/Input-OutputEntities/LabourEntities/labour"
import { IAddLabourUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/AddLabourEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class AddLabourUseCase implements IAddLabourUseCase {
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(input: addLabourInput): Promise<commonOutput> {
      try {
         const { labour_type, daily_wage } = input
         const existLabourData = await this.labourRepository.findLabourByType(labour_type)
         if (existLabourData) {
            return ResponseHelper.failure(ERROR_MESSAGE.LABOUR.EXIST_LABOUR, HTTP_STATUS.CONFLICT)
         }
         await this.labourRepository.saveLabour(labour_type, daily_wage)
         return ResponseHelper.success(SUCCESS_MESSAGE.LABOUR.ADD, HTTP_STATUS.CREATED)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}


