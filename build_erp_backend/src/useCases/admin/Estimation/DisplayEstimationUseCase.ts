import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { SpecData } from "../../../Entities/Input-OutputEntities/EstimationEntities/estimation";
import { IDisplayEstimationUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/EstimationUseCaseEntities/DisplayEstimationEntity";


export class DisplayEstimationUseCase implements IDisplayEstimationUseCase{
   private estimationRepository : IEstimationRepository
   constructor(estimationRepository : IEstimationRepository){
      this.estimationRepository = estimationRepository
   }
   async axecute(search:string,page:number):Promise<{data:SpecData[],totalPage:number}>{
      const result = await this.estimationRepository.displaySpec(search,page)
      return result
   }
}