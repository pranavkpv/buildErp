import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository"
import { IUnitRepository } from "../../../domain/repositories/IUnitRepository"
import { deletUnitInput, outputUnit } from "../../../domain/types/unit"


export class deleteUnitUseCase {
   private UnitRepository: IUnitRepository
   private MaterialRepository: IMaterialRepository
   constructor(UnitRepository: IUnitRepository, MaterialRepository: IMaterialRepository) {
      this.UnitRepository = UnitRepository
      this.MaterialRepository = MaterialRepository
   }
   async execute(input: deletUnitInput): Promise<outputUnit> {
      const { _id } = input
      const existUnit = await this.MaterialRepository.findMaterialByUnitId(_id)
      if (existUnit) {
         return {
            success: false,
            message: "unit already used"
         }
      }
      await this.UnitRepository.deleteUnitById(_id)
      return {
         success: true,
         message: "unit deleted successfully"
      }
   }
}