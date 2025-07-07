import { IEstimationRepository } from "../../../domain/repositories/IEstimationRepository";
import { SpecData } from "../../../domain/types/estimation";


export class DisplayEstimationUseCase{
   private estimationRepository : IEstimationRepository
   constructor(estimationRepository : IEstimationRepository){
      this.estimationRepository = estimationRepository
   }
   async axecute():Promise<SpecData[]>{
      const result = await this.estimationRepository.displaySpec()
      return result
   }
}