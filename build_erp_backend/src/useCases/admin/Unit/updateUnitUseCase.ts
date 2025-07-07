import { IUnitRepository } from "../../../domain/repositories/IUnitRepository"
import { editUnitInput, outputUnit } from "../../../domain/types/unit"


export class updateUnitUseCase {
   private UnitRepository: IUnitRepository
   constructor(UnitRepository: IUnitRepository) {
      this.UnitRepository = UnitRepository
   }
   async execute(input: editUnitInput): Promise<outputUnit> {
      const { _id, unit_name, short_name } = input
      const existUnit = await this.UnitRepository.findUnitInEdit(_id, unit_name)
      if (existUnit) {
         return {
            success: false,
            message: "unit already exist"
         }
      } else {
         await this.UnitRepository.updateUnitById(_id, unit_name, short_name)
         return {
            success: true,
            message: "unit updated successfully"
         }
      }
   }
}