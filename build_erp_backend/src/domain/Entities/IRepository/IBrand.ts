import { listingInput } from "../../../application/Entities/common.entity"
import { IBrandModelEntity } from "../modelEntities/brand.entity"


export interface IBrandRepository {

   getAllBrands():
      Promise<IBrandModelEntity[] | []>

   getBrandByName(brand_name: string):
      Promise<IBrandModelEntity | null>

   createBrand(brand_name: string):
      Promise<void>

   getBrandForEdit(_id: string, brand_name: string):
      Promise<IBrandModelEntity | null>

   updateBrand(_id: string, brand_name: string):
      Promise<void>

   deleteBrand(_id: string):
      Promise<void>

   getBrandsWithPagination(input: listingInput):
      Promise<{ data: IBrandModelEntity[], totalPage: number }>
      
}
