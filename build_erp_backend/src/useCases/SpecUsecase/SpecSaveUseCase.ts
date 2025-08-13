import { ISaveSpecUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecSaveEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ISpecRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { InputSpecification } from "../../DTO/EstimationEntities/specification";
import { SpecFailedMessage, SpecSuccessMessage } from "../../Shared/Messages/Specification.Message";


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