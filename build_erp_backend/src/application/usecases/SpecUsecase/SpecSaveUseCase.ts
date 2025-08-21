import { ISpecRepository } from "../../../domain/interfaces/Estimation-management/ISpecRepository";
import { SpecFailedMessage, SpecSuccessMessage } from "../../../Shared/Messages/Specification.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { InputSpecification } from "../../entities/spec.entity";
import { ISaveSpecUseCase } from "../../interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecSaveEntity";


export class SaveSpecUseCase implements ISaveSpecUseCase {

   constructor(
      private _specRepository: ISpecRepository
   ) { }
   async execute(input: InputSpecification): Promise<commonOutput> {
      const { specId, specname, specUnit, specDescription,
         materialDetails, labourDetails, additionalExpensePer, profitPer } = input
      const existSpec = await this._specRepository.existSpecname(specname)
      const existSpecId = await this._specRepository.existSpecId(specId)
      if (existSpec) {
         return ResponseHelper.conflictData(SpecFailedMessage.EXIST_NAME)
      }
      if (existSpecId) {
         return ResponseHelper.conflictData(SpecFailedMessage.EXIST_ID)
      }

      await this._specRepository.saveSpecData({
         specId, specname, specUnit, specDescription,
         materialDetails, labourDetails, additionalExpensePer, profitPer
      })
      return ResponseHelper.createdSuccess(SpecSuccessMessage.ADD)
   }
}