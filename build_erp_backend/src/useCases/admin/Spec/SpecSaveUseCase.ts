import { ISpecRepository } from "../../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { Specification } from "../../../Entities/Input-OutputEntities/EstimationEntities/specification";
import { ISaveSpecUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecSaveEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";


export class SaveSpecUseCase implements ISaveSpecUseCase {
   private specRepository: ISpecRepository
   constructor(specRepository: ISpecRepository) {
      this.specRepository = specRepository
   }
   async execute(input: Specification): Promise<commonOutput> {
      const { specId, specname, specUnit, specDescription,
         materialDetails, labourDetails, additionalExpense_per, profit_per } = input
      const existSpec = this.specRepository.existSpecname(specname)
      const existSpecId = this.specRepository.existSpecId(specId)
      if (!existSpec) {
         return ResponseHelper.failure(ERROR_MESSAGE.SPEC.EXIST_NAME, HTTP_STATUS.CONFLICT)
      }
      if (!existSpecId) {
         return ResponseHelper.failure(ERROR_MESSAGE.SPEC.EXIST_ID, HTTP_STATUS.CONFLICT)
      }

      await this.specRepository.saveSpecData(specId, specname, specUnit, specDescription,
         materialDetails, labourDetails, additionalExpense_per, profit_per)
      return ResponseHelper.success(SUCCESS_MESSAGE.SPEC.ADD, HTTP_STATUS.CREATED)
   }
}