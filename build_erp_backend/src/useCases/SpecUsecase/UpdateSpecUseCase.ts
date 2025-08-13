import { commonOutput } from "../../DTO/CommonEntities/common";
import { InputSpecification } from "../../DTO/EstimationEntities/specification";
import { ISpecRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { IUpdateSpecUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/UpdateSpecEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { SpecFailedMessage, SpecSuccessMessage } from "../../Shared/Messages/Specification.Message";

export class UpdateSpecUseCase implements IUpdateSpecUseCaseEntity {
   private SpecRepository: ISpecRepositoryEntity
   constructor(SpecRepository: ISpecRepositoryEntity) {
      this.SpecRepository = SpecRepository
   }
   async execute(input: InputSpecification): Promise<commonOutput> {
      const { _id, specId, specname, specUnit, specDescription,
         materialDetails, labourDetails, additionalExpense_per, profit_per } = input
      if (!_id) return ResponseHelper.badRequest(SpecFailedMessage.SPEC_ID_MISS)
      const existSpecIDInEdit = await this.SpecRepository.findSpecInEdit(_id, specId)
      const existSpecNameInEdit = await this.SpecRepository.findSpecInEditByName(_id, specname)
      if (existSpecIDInEdit) {
         return ResponseHelper.conflictData(SpecFailedMessage.EXIST_ID)
      }
      if (existSpecNameInEdit) {
         return ResponseHelper.conflictData(SpecFailedMessage.EXIST_NAME)
      }
      await this.SpecRepository.UpdateSpec({
         _id, specId, specname, specUnit, specDescription,
         materialDetails, labourDetails, additionalExpense_per, profit_per
      })
      return ResponseHelper.success(SpecSuccessMessage.UPDATE)
   }
}