import { inputBrand } from "../../DTO/BrandEntities/Brand.Entity";
import { commonOutput, listingInput } from "../../DTO/CommonEntities/common";
import { IBrandRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IBrandRepository";
import { IDisplayAllBrandUseCaseEntity } from "../../Entities/useCaseEntities/Brand.UseCase.Entities/DisplayAllBrandEntity";
import { brandSuccessMessage } from "../../Shared/Messages/Brand.Message";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";


export class DisplayAllBrandUseCase implements IDisplayAllBrandUseCaseEntity {
   private brandRepository: IBrandRepositoryEntity
   constructor(brandRepository: IBrandRepositoryEntity) {
      this.brandRepository = brandRepository
   }
   async execute(input : listingInput): Promise<commonOutput> {
      const { data, totalPage } = await this.brandRepository.findAllListBrand(input)
      const mappedData = data.map((brand: inputBrand) => (
         {
            _id: brand._id,
            brand_name: brand.brand_name

         }
      ))
      return ResponseHelper.success(brandSuccessMessage.FETCH, mappedData,totalPage)
   }
}

