import { IBrandRepository } from "../../../domain/repositories/IBrandRepository"
import { IMaterialRepository } from "../../../domain/repositories/IMaterialRepository"
import { deleteBrandInput, outputBrand } from "../../../domain/types/brand"


export class DeleteBrandUseCase {
   private brandRepository: IBrandRepository
   private materialRepository: IMaterialRepository
   constructor(brandRepository: IBrandRepository, materialRepository: IMaterialRepository) {
      this.brandRepository = brandRepository
      this.materialRepository = materialRepository
   }
   async execute(input: deleteBrandInput): Promise<outputBrand> {
      const { _id } = input
      const existBrand = await this.materialRepository.findMaterialByBrandId(_id)
      if (existBrand) {
         return {
            success: false,
            message: "Brand used already"
         }
      }
      await this.brandRepository.deleteBrandById(_id)
      return {
         success: true,
         message: "Brand deleted successfuly"
      }

   }
}
