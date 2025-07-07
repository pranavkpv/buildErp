import { IBrandRepository } from "../../../domain/repositories/IBrandRepository"
import { editBrandInput, outputBrand } from "../../../domain/types/brand"


export class UpdateBrandUseCase {
   private brandRepository: IBrandRepository
   constructor(brandRepository: IBrandRepository) {
      this.brandRepository = brandRepository
   }
   async execute(input: editBrandInput): Promise<outputBrand> {
      const { _id, brand_name } = input
      const existBrandData = await this.brandRepository.findBrandInEdit(_id, brand_name)
      if (existBrandData) {
         return {
            success: false,
            message: "Brand already exist"
         }
      }
      await this.brandRepository.updateBrandById(_id, brand_name)
      return {
         success: true,
         message: "Brand Updated successfuly"
      }

   }
}
