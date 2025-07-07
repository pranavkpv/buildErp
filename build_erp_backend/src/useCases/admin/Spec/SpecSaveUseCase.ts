import { ISpecRepository } from "../../../domain/repositories/ISpecRepository";
import { outputSpec, Specification } from "../../../domain/types/specification";

type materialData = {
   material_id: string
   quantity: number
}
type labourData = {
   labour_id: string,
   numberoflabour: number
}
export class SaveSpecUseCase {
   private specRepository: ISpecRepository
   constructor(specRepository: ISpecRepository) {
      this.specRepository = specRepository
   }
   async execute(input:Specification): Promise<outputSpec> {
   const {specId, specname, specUnit, specDescription,
         materialDetails, labourDetails, additionalExpense_per, profit_per} = input
         const existSpec = this.specRepository.existSpecname(specname)
         const existSpecId = this.specRepository.existSpecId(specId)
         if(!existSpec){
            return {
               success:false,
               message:"spec name already exist"
            }
         }
         if(!existSpecId){
             return {
               success:false,
               message:"specId already exist"
            }
         }

      await this.specRepository.saveSpecData(specId, specname, specUnit, specDescription,
         materialDetails, labourDetails, additionalExpense_per, profit_per)
      return {
         success: true,
         message: "Spec saved successfully"
      }
   }
}