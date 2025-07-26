import { IBrandRepository } from "../../Entities/repositoryEntities/Material-management/IBrandRepository";
import { brandDB } from "../../Database/Model/BrandModel";
import { IBrandModelEntity } from "../../Entities/ModelEntities/Brand.Entity";



export class BrandRepository implements IBrandRepository {
   async findAllBrand(): Promise<IBrandModelEntity[] | []> {
      const brandData = await brandDB.find()
      return brandData 
   }
   async findBrandByName(brand_name: string): Promise<IBrandModelEntity | null> {
      const existBrand = await brandDB.findOne({ brand_name:{$regex:new RegExp(`^${brand_name}$`,"i")} })
      return existBrand 
   }
   async saveBrand(brand_name: string): Promise<void> {
      const newBrand = new brandDB({
         brand_name
      })
      await newBrand.save()
   }
   async findBrandInEdit(_id: string, brand_name: string): Promise<IBrandModelEntity | null> {
      const existBrand = await brandDB.findOne({ _id: { $ne: _id }, brand_name:{$regex:new RegExp(`^${brand_name}$`,"i")} })
      return existBrand 
   }
   async updateBrandById(_id: string, brand_name: string): Promise<void> {
      await brandDB.findByIdAndUpdate(_id, { brand_name })
   }
   async deleteBrandById(_id: string): Promise<void> {
      await brandDB.findByIdAndDelete(_id)
   }
   async findAllListBrand(page: number, search: string): Promise<{ getBrandData: any[]; totalPage: number; }> {
      const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const brandList = await brandDB.find({ brand_name: { $regex: searchRegex } }).skip(skip).limit(5)
      const totalPage = await brandDB.countDocuments({ brand_name: { $regex: searchRegex } }) / 5
      return {
         getBrandData: brandList,
         totalPage
      }
   }
}
