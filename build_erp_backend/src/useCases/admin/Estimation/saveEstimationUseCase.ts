import { IEstimationRepository } from "../../../domain/repositories/IEstimationRepository";
import { outPutEstimation, rowData } from "../../../domain/types/estimation";


export class SaveEstimationUseCase {
   private estimationRepository : IEstimationRepository
   constructor(estimationRepository : IEstimationRepository){
      this.estimationRepository = estimationRepository
   }
   async execute(input: { projectId: string, row: rowData[] }):Promise<outPutEstimation> {
      const projectId = input.projectId
      const specDetails = input.row
      await this.estimationRepository.saveEstimation(specDetails,projectId)
      return {
         success:true,
         message:"Estimation saved successfully"
      }
   }
}