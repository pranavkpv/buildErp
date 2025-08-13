import { ISpecRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { IgetSpecUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/GetSpecEntity";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { specOutput } from "../../DTO/EstimationEntities/specification";
import { SpecSuccessMessage } from "../../Shared/Messages/Specification.Message";


export class getSpecUseCase implements IgetSpecUseCaseEntity {
   private specRepository: ISpecRepositoryEntity
   constructor(specRepository: ISpecRepositoryEntity) {
      this.specRepository = specRepository
   }
   async execute(): Promise<specOutput | commonOutput> {
      const data = await this.specRepository.fetchSpec()
      return ResponseHelper.success(SpecSuccessMessage.FETCH, data)
   }
}