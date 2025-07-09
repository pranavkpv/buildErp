import { IEstimationRepository } from "../../../domain/repositories/IEstimationRepository";
import { SpecData } from "../../../domain/types/estimation";


export class DisplayEstimationUseCase{
   private estimationRepository : IEstimationRepository
   constructor(estimationRepository : IEstimationRepository){
      this.estimationRepository = estimationRepository
   }
   async axecute(search:string,page:number):Promise<{data:SpecData[],totalPage:number}>{
      const result = await this.estimationRepository.displaySpec(search,page)
      return result
   }
}