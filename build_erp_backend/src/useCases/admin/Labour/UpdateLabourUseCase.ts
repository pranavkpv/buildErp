import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { editLabourInput } from "../../../Entities/Input-OutputEntities/LabourEntities/labour"
import { IUpdateLabourUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/UpdateLabourEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"



export class UpdateLabourUseCase implements IUpdateLabourUseCase {
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(input: editLabourInput): Promise<commonOutput> {
      try {
         const { _id, labour_type, daily_wage } = input
         const existLabour = await this.labourRepository.findLabourInEdit(_id, labour_type)
         if (existLabour) {
            return ResponseHelper.failure(ERROR_MESSAGE.LABOUR.EXIST_LABOUR, HTTP_STATUS.CONFLICT)
         }
         await this.labourRepository.updateLabourById(_id, labour_type, daily_wage)
         return ResponseHelper.success(SUCCESS_MESSAGE.LABOUR.UPDATE, HTTP_STATUS.OK)
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}