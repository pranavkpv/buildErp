import { IEstimationRepository } from "../../../domain/repositories/IEstimationRepository";

export class FetchExistEstimationUseCase{
   private estimationRepository:IEstimationRepository
   constructor(estimationRepository:IEstimationRepository){
     this.estimationRepository = estimationRepository
   }
   async execute(_id:string){
     const data = await this.estimationRepository.AggregateEstimationBySpec(_id)
     return data
   }
}