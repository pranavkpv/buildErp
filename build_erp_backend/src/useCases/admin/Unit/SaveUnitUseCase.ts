import { IUnitRepository } from "../../../domain/repositories/IUnitRepository"
import { addUnitInput, outputUnit } from "../../../domain/types/unit"


export class SaveUnitUseCase {
   private UnitRepository: IUnitRepository
   constructor(UnitRepository: IUnitRepository) {
      this.UnitRepository = UnitRepository
   }
   async execute(input: addUnitInput): Promise<outputUnit> {
      const { unit_name, short_name } = input
      const ExistUnit = await this.UnitRepository.findUnitByunit_name(unit_name)
      if (ExistUnit) {
         return {
            success: false,
            message: "Unit already exist"
         }
      }
      await this.UnitRepository.saveUnit(unit_name, short_name)
      return {
         success: true,
         message: "Unit registerd successfully"
      }
   }
}