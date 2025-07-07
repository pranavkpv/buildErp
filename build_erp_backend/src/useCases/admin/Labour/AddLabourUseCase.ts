import { ILabourRepository } from "../../../domain/repositories/ILabourRepository"
import { addLabourInput, outputLabour } from "../../../domain/types/labour"


export class AddLabourUseCase {
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(input: addLabourInput): Promise<outputLabour> {
      const { labour_type, daily_wage } = input
      const existLabourData = await this.labourRepository.findLabourByType(labour_type)
      if (existLabourData) {
         return {
            success: false,
            message: "labour already exist"
         }
      }
      await this.labourRepository.saveLabour(labour_type, daily_wage)
      return {
         success: true,
         message: "labour type registered successfully"
      }
   }
}


