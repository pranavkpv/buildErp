import { IBrandRepository } from "../../../domain/repositories/IBrandRepository"
import { addBrandInput, outputBrand } from "../../../domain/types/brand"


export class SaveBrandUseCase {
   private brandRepository: IBrandRepository
   constructor(brandRepository: IBrandRepository) {
      this.brandRepository = brandRepository
   }
   async execute(input: addBrandInput): Promise<outputBrand> {
      const { brand_name } = input
      const existBrandData = await this.brandRepository.findBrandByName(brand_name)
      if (existBrandData) {
         return {
            success: false,
            message: "Brand already exist",
         }
      }

      await this.brandRepository.saveBrand(brand_name)
      return {
         success: true,
         message: "Brand Registered successfuly",
      }
   }
}
