import { ILabourRepository } from "../../../domain/repositories/ILabourRepository";



export class DisplayAllLabourUseCase {
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(page:number,search:string): Promise<{getLabourData:any[];totalPage:number }> {
      const {getLabourData,totalPage} = await this.labourRepository.findAllLabour(page,search)
       return {
         getLabourData,
         totalPage
      }
   }
}



