import { ISpecRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/ISpecRepository";
import { ISpeclistUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecListEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { specOutput } from "../../DTO/EstimationEntities/specification";
import { SpecSuccessMessage } from "../../Shared/Messages/Specification.Message";


export class SpeclistUseCase implements ISpeclistUseCaseEntity {
   private specRepository: ISpecRepositoryEntity
   constructor(specRepository: ISpecRepositoryEntity) {
      this.specRepository = specRepository
   }
   async execute(page: number, search: string): Promise<specOutput | commonOutput> {
         const {result,totalPage} = await this.specRepository.fetchSpecList({page, search})
         return ResponseHelper.success(SpecSuccessMessage.FETCH,DataTransfer,totalPage)
   }
}