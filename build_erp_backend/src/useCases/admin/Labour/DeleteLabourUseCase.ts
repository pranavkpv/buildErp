import { ILabourRepository } from "../../../domain/repositories/ILabourRepository"
import { deleteLabourInput, outputLabour } from "../../../domain/types/labour"


export class DeleteLabourUseCase{
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(input:deleteLabourInput):Promise<outputLabour>{
      const {_id} = input
      await this.labourRepository.deleteLabourById(_id)
       return {
         success: true,
         message: "labour type deleted successfully"
      }
   }
}