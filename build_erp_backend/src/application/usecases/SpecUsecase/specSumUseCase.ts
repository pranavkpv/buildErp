import { ILabourRepositoryEntity } from "../../../domain/interfaces/Labour-management/ILabourRepository";
import { IMaterialRepositoryEntity } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { mixMatAndLabour, specOutput } from "../../dto/EstimationEntities/specification";
import { ISpecSumUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/SpecUseCaseEntities/SpecSumEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/CommonEntities/common";
import { SpecSuccessMessage } from "../../../Shared/Messages/Specification.Message";




export class SpecSumUseCase implements ISpecSumUseCaseEntity {
   private materialRepository: IMaterialRepositoryEntity
   private labourRepository: ILabourRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity, labourRepository: ILabourRepositoryEntity) {
      this.materialRepository = materialRepository
      this.labourRepository = labourRepository
   }
   async execute(input: mixMatAndLabour): Promise<specOutput | commonOutput> {
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