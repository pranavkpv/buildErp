import { IEstimationRepository } from "../../../domain/repositories/IEstimationRepository";
import { fetchcost, fetchcostOutput } from "../../../domain/types/Stage";

export class FetchCostUseCase{
   private estimationReposiitory : IEstimationRepository
   constructor(estimationReposiitory : IEstimationRepository){
      this.estimationReposiitory = estimationReposiitory
   }
   async execute(input:fetchcost):Promise<fetchcostOutput>{
      const {projectId} = input
      const ExistEstimation = await this.estimationReposiitory.findEstimationByProjectId(projectId)
      if(ExistEstimation.length ==0){
           return {
            success:false,
            message:"please estimate that project"
           }
      }
      let sum = 0
      for(let element of ExistEstimation){
         sum+=(element.quantity * element.unit_rate)
      }
      return {
         success:true,
         message:sum
      }
   }
}