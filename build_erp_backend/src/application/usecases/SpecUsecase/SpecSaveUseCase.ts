import { ISaveSpecUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecSaveEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ISpecRepositoryEntity } from "../../../domain/interfaces/Estimation-management/ISpecRepository";
import { commonOutput } from "../../dto/CommonEntities/common";
import { InputSpecification } from "../../dto/EstimationEntities/specification";
import { SpecFailedMessage, SpecSuccessMessage } from "../../../Shared/Messages/Specification.Message";


export class SaveSpecUseCase implements ISaveSpecUseCaseEntity {
   private specRepository: ISpecRepositoryEntity
   constructor(specRepository: ISpecRepositoryEntity) {
      this.specRepository = specRepository
   }
   async execute(input: InputSpecification): Promise<commonOutput> {
      const { specId, specname, specUnit, specDescription,
         materialDetails, labourDetails, additionalExpense_per, profit_per } = input
      const existSpec = await this.specRepository.existSpecname(specname)
      const existSpecId = await this.specRepository.existSpecId(specId)
      if (existSpec) {
         return ResponseHelper.conflictData(SpecFailedMessage.EXIST_NAME)
      }
      if (existSpecId) {
         return ResponseHelper.conflictData(SpecFailedMessage.EXIST_ID)
      }

      await this.specRepository.saveSpecData({
         specId, specname, specUnit, specDescription,
         materialDetails, labourDetails, additionalExpense_per, profit_per
      })
      return ResponseHelper.createdSuccess(SpecSuccessMessage.ADD)
   }
}