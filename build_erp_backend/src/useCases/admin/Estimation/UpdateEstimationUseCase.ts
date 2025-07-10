import { IEstimationRepository } from "../../../domain/repositories/IEstimationRepository";
import { rowData } from "../../../domain/types/estimation";

export class UpdateEstimationUsecase {
   private estimationRepository: IEstimationRepository
   constructor(estimationRepository: IEstimationRepository) {
      this.estimationRepository = estimationRepository
   }
   async execute(input: { projectId: string, row: rowData[] }) {
      const { projectId, row } = input
      await this.estimationRepository.deleteEstimationById(projectId)
      await this.estimationRepository.saveEstimation(row, projectId)
      return {
         success: true,
         message: "Estimation saved successfully"
      }
   }
}