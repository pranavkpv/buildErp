import { inputBrand, listBrandOutput } from "../../../DTO/BrandEntities/Brand.Entity"
import { listingInput } from "../../../DTO/CommonEntities/common"
import { IBrandModelEntity } from "../../ModelEntities/Brand.Entity"


export interface IBrandRepositoryEntity {
   findAllBrand(): Promise<IBrandModelEntity[] | []>
   findBrandByName(input: inputBrand): Promise<IBrandModelEntity | null>
   saveBrand(input: inputBrand): Promise<void>
   findBrandInEdit(input: inputBrand): Promise<IBrandModelEntity | null>
   updateBrandById(input: inputBrand): Promise<void>
   deleteBrandById(_id: string): Promise<void>
   findAllListBrand(input: listingInput): Promise<listBrandOutput>
}