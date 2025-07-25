import { ILabourRepository } from "../../../Entities/repositoryEntities/Labour-management/ILabourRepository";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { mixMatAndLabour } from "../../../Entities/Input-OutputEntities/EstimationEntities/specification";
import { ISpecSumUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SpecUseCaseEntities/SpecSumEntity";




export class SpecSumUseCase implements ISpecSumUseCase {
   private materialRepository : IMaterialRepository
   private labourRepository : ILabourRepository
   constructor(materialRepository : IMaterialRepository,labourRepository : ILabourRepository){
      this.materialRepository = materialRepository
      this.labourRepository = labourRepository
   }
   async execute(input:mixMatAndLabour):Promise<number>{
      const {materialDetails,labourDetails} = input
      let sumofMaterial = 0
      let sumOfLabour = 0
      for(let element of materialDetails){
            const material = await this.materialRepository.findMaterialById(element.material_id)
            if(material){
               sumofMaterial+=(material?.unit_rate * element.quantity)
            }
      }
      for(let element of labourDetails){
         const labour = await this.labourRepository.findLabourById(element.labour_id)
         if(labour){
            sumOfLabour += (labour.daily_wage * element.numberoflabour)
         }

      }
      return sumofMaterial + sumOfLabour
   }
}