import { listingInput } from "../../../application/entities/common.entity"
import { IBrandModelEntity } from "../../Entities/modelEntities/brand.entity"


export interface IBrandRepository {
   findAllBrand(): Promise<IBrandModelEntity[] | []>
   findBrandByName(brand_name:string): Promise<IBrandModelEntity | null>
   saveBrand(brand_name:string): Promise<void>
   findBrandInEdit(_id:string,brand_name:string): Promise<IBrandModelEntity | null>
   updateBrandById(_id:string,brand_name:string): Promise<void>
   deleteBrandById(_id: string): Promise<void>
   findAllListBrand(input: listingInput):  Promise<{data:IBrandModelEntity[],totalPage:number}>
}