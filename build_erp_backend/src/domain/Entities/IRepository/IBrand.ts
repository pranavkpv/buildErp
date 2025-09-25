import { listingInput } from '../../../application/entities/common.entity';
import { IBrandModelEntity } from '../modelEntities/brand.entity';


export interface IBrandRepository {

   getAllBrands():
      Promise<IBrandModelEntity[] | []>

   getBrandByName(brandName: string):
      Promise<IBrandModelEntity | null>

   createBrand(brand_name: string):
      Promise<void>

   getBrandForEdit(id: string, brandName: string):
      Promise<IBrandModelEntity | null>

   updateBrand(id: string, brandName: string):
      Promise<void>

   deleteBrand(id: string):
      Promise<void>

   getBrandsWithPagination(input: listingInput):
      Promise<{ data: IBrandModelEntity[], totalPage: number }>
      
}
