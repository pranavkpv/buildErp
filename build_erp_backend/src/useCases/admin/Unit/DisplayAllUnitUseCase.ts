import { IUnitRepository } from "../../../domain/repositories/IUnitRepository";



export class DisplayAllUnitUseCase {
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










