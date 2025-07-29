import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { Specification } from "../../../Entities/Input-OutputEntities/EstimationEntities/specification";
import { ISpecRepository } from "../../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { IUpdateSpecUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/UpdateSpecEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class UpdateSpecUseCase implements IUpdateSpecUseCase {
   private SpecRepository: ISpecRepository
   constructor(SpecRepository: ISpecRepository) {
      this.SpecRepository = SpecRepository
   }
   async execute(input: Specification): Promise<commonOutput> {
      try {
         const { _id, specId, specname, specUnit, specDescription,
            materialDetails, labourDetails, additionalExpense_per, profit_per } = input
         const existSpecIDInEdit = await this.SpecRepository.findSpecInEdit(_id, specId)
         const existSpecNameInEdit = await this.SpecRepository.findSpecInEditByName(_id, specname)
         if (existSpecIDInEdit) {
            return ResponseHelper.failure(ERROR_MESSAGE.SPEC.EXIST_ID, HTTP_STATUS.CONFLICT)
         }
         if (existSpecNameInEdit) {
            return ResponseHelper.failure(ERROR_MESSAGE.SPEC.EXIST_NAME, HTTP_STATUS.CONFLICT)
         }
         await this.SpecRepository.UpdateSpec(_id, specId, specname, specUnit, specDescription,
            materialDetails, labourDetails, additionalExpense_per, profit_per)
         return ResponseHelper.success(SUCCESS_MESSAGE.SPEC.UPDATE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}