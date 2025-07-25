import { IBrandRepository } from "../../../Entities/repositoryEntities/Material-management/IBrandRepository";
import { IDisplayAllBrandUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/BrandUseCaseEntities/DisplayAllBrandEntity";




export class DisplayAllBrandUseCase implements IDisplayAllBrandUseCase {
   private brandRepository: IBrandRepository
   constructor(brandRepository: IBrandRepository) {
      this.brandRepository = brandRepository
   }
   async execute(page:number,search:string): Promise<{getBrandData:any[];totalPage:number }> {
      const {getBrandData,totalPage} = await this.brandRepository.findAllListBrand(page,search)
      return {
         getBrandData,
         totalPage
      }
   }
}

