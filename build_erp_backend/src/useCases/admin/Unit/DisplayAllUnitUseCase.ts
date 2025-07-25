import { IUnitRepository } from "../../../Entities/repositoryEntities/Material-management/IUnitRepository";
import { IDisplayAllUnitUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/UnitUseCaseEntities/DisplayAllUnitEntity";




export class DisplayAllUnitUseCase implements IDisplayAllUnitUseCase {
   private UnitRepository: IUnitRepository
   constructor(UnitRepository: IUnitRepository) {
      this.UnitRepository = UnitRepository
   }
   async execute(page:number,search:string): Promise<{getUnitData:any[];totalPage:number }> {
      const {getUnitData,totalPage} = await this.UnitRepository.findAllListUnit(page, search)
      return {
          getUnitData,
         totalPage
      }
   }
}










