import { ILabourRepository } from "../../../domain/repositories/ILabourRepository"
import { ISpecRepository } from "../../../domain/repositories/ISpecRepository"
import { deleteLabourInput, outputLabour } from "../../../domain/types/labour"


export class DeleteLabourUseCase{
   private labourRepository: ILabourRepository
   private specRepository : ISpecRepository
   constructor(labourRepository: ILabourRepository,specRepository : ISpecRepository) {
      this.labourRepository = labourRepository
      this.specRepository = specRepository
   }
   async execute(input:deleteLabourInput):Promise<outputLabour>{
      const {_id} = input
      const existSpec = await this.specRepository.findSpecByLabourId(_id)
      if(existSpec){
         return {
            success:false,
            message:"labour type already used in specification registration"
         }
      }
      await this.labourRepository.deleteLabourById(_id)
       return {
         success: true,
         message: "labour type deleted successfully"
      }
   }
}