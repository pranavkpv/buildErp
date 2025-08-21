
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { SpecSuccessMessage } from "../../../Shared/Messages/Specification.Message";
import { ISpeclistUseCase } from "../../interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecListEntity";
import { ISpecRepository } from "../../../domain/interfaces/Estimation-management/ISpecRepository";
import { commonOutput } from "../../dto/common";
import { listingInput } from "../../entities/common.entity";


export class SpeclistUseCase implements ISpeclistUseCase {
  
   constructor( 
      private specRepository: ISpecRepository
   ) { }
   async execute(input:listingInput): Promise<commonOutput<{data:any[],totalPage:number}> | commonOutput> {
         const {result,totalPage} = await this.specRepository.fetchSpecList(input)
         return ResponseHelper.success(SpecSuccessMessage.FETCH,{data:result,totalPage})
   }
}