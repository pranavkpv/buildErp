import { ISpecSumUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecSumEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { SpecSuccessMessage } from "../../../Shared/Messages/Specification.Message";
import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { ILabourRepository } from "../../../domain/interfaces/Labour-management/ILabourRepository";
import { mixMatAndLabour } from "../../entities/spec.entity";
import { commonOutput } from "../../dto/common";



export class SpecSumUseCase implements ISpecSumUseCaseEntity {
   constructor(
      private materialRepository: IMaterialRepository,
      private labourRepository: ILabourRepository
   ) { }
   async execute(input: mixMatAndLabour): Promise<commonOutput<number> | commonOutput> {
      const { materialDetails, labourDetails } = input
      let sumofMaterial = 0
      let sumOfLabour = 0
      for (let element of materialDetails) {
         const material = await this.materialRepository.findMaterialById(element.material_id)
         if (material) {
            sumofMaterial += (material?.unit_rate * element.quantity)
         }
      }
      for (let element of labourDetails) {
         const labour = await this.labourRepository.findLabourById(element.labour_id)
         if (labour) {
            sumOfLabour += (labour.daily_wage * element.numberoflabour)
         }

      }
      return ResponseHelper.success(SpecSuccessMessage.UNIT_RATE_FETCH, sumofMaterial + sumOfLabour)
   }
}