import { EstimationData } from "../../../Entities/Input-OutputEntities/EstimationEntities/estimation";
import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { IFetchExistEstimationUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/FetchExistEstimationEntity";

export class FetchExistEstimationUseCase implements IFetchExistEstimationUseCase{
   private estimationRepository:IEstimationRepository
   constructor(estimationRepository:IEstimationRepository){
     this.estimationRepository = estimationRepository
   }
   async execute(_id:string):Promise <EstimationData[]>{
     const data = await this.estimationRepository.AggregateEstimationBySpec(_id)
     return data
   }
}