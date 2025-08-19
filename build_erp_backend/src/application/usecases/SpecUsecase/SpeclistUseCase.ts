import { ISpecRepositoryEntity } from "../../../domain/interfaces/Estimation-management/ISpecRepository";
import { ISpeclistUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecListEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/CommonEntities/common";
import { specOutput } from "../../dto/EstimationEntities/specification";
import { SpecSuccessMessage } from "../../../Shared/Messages/Specification.Message";


export class SpeclistUseCase implements ISpeclistUseCaseEntity {
   private specRepository: ISpecRepositoryEntity
   constructor(specRepository: ISpecRepositoryEntity) {
      this.specRepository = specRepository
   }
   async execute(page: number, search: string): Promise<specOutput | commonOutput> {
         const {result,totalPage} = await this.specRepository.fetchSpecList({page, search})
         return ResponseHelper.success(SpecSuccessMessage.FETCH,result,totalPage)
   }
}