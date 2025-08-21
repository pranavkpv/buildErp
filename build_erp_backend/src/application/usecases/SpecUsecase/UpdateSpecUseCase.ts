
import { IUpdateSpecUseCase } from "../../interfaces/AdminUseCaseEntities/SpecUseCaseEntities/UpdateSpecEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { SpecFailedMessage, SpecSuccessMessage } from "../../../Shared/Messages/Specification.Message";
import { ISpecRepository } from "../../../domain/interfaces/Estimation-management/ISpecRepository";
import { InputSpecification } from "../../entities/spec.entity";
import { commonOutput } from "../../dto/common";

export class UpdateSpecUseCase implements IUpdateSpecUseCase {
   constructor(
      private SpecRepository: ISpecRepository
   ) { }
   async execute(input: InputSpecification): Promise<commonOutput> {
      const { _id, specId, specname, specUnit, specDescription,
         materialDetails, labourDetails, additionalExpensePer, profitPer } = input
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
         materialDetails, labourDetails, additionalExpensePer, profitPer
      })
      return ResponseHelper.success(SpecSuccessMessage.UPDATE)
   }
}