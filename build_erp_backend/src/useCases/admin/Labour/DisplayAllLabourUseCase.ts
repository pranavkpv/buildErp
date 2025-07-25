import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IDisplayAllLabourUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/LabourUseCaseEntities/DisplayAllLoabourEntity";



export class DisplayAllLabourUseCase implements IDisplayAllLabourUsecase {
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



