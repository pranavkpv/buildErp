import { Brand } from "../types/brand";

export interface IBrandRepository {
   findAllBrand(): Promise<Brand[] | []>
   findBrandByName(brand_name: string): Promise<Brand | null>
   saveBrand(brand_name: string): Promise<void>
   findBrandInEdit(_id: string, brand_name: string): Promise<Brand | null>
   updateBrandById(_id: string, brand_name: string): Promise<void>
   deleteBrandById(_id: string): Promise<void>
   findAllListBrand(page:number,search:string):Promise<{getBrandData:any[];totalPage:number }>
}