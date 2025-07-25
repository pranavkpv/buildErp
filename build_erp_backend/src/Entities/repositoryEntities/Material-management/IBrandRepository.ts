import { IBrandModelEntity } from "../../ModelEntities/Brand.Entity"


export interface IBrandRepository {
   findAllBrand(): Promise<IBrandModelEntity[] | []>
   findBrandByName(brand_name: string): Promise<IBrandModelEntity | null>
   saveBrand(brand_name: string): Promise<void>
   findBrandInEdit(_id: string, brand_name: string): Promise<IBrandModelEntity | null>
   updateBrandById(_id: string, brand_name: string): Promise<void>
   deleteBrandById(_id: string): Promise<void>
   findAllListBrand(page:number,search:string):Promise<{getBrandData:any[];totalPage:number }>
}