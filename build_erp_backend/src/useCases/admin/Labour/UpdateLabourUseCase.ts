import { ILabourRepository } from "../../../domain/repositories/ILabourRepository"
import { editLabourInput, outputLabour } from "../../../domain/types/labour"


export class UpdateLabourUseCase{
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(input:editLabourInput):Promise<outputLabour>{
      const {_id,labour_type,daily_wage} = input
      const existLabour = await this.labourRepository.findLabourInEdit(_id,labour_type)
      if (existLabour) {
         return {
            success: false,
            message: "labour type already exist"
         }
      } 
      await this.labourRepository.updateLabourById(_id,labour_type,daily_wage)
      return {
            success: true,
            message: "labour type updated successfully"
         }
   }
}