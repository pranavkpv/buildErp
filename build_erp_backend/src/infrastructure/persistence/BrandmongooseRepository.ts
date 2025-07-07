import { IBrandRepository } from "../../domain/repositories/IBrandRepository";
import { Brand } from "../../domain/types/brand";
import BrandModel from "../../models/BrandModel";
import MaterialModel from "../../models/MaterialModel";

export class BrandmongooseRepository implements IBrandRepository {
   async findAllBrand(): Promise<Brand[] | []> {
      const brandData = await BrandModel.find()
      return brandData ? (brandData as Brand[]) : []
   }
   async findBrandByName(brand_name: string): Promise<Brand | null> {
      const existBrand = await BrandModel.findOne({ brand_name:{$regex:new RegExp(`^${brand_name}$`,"i")} })
      return existBrand ? (existBrand as Brand) : null
   }
   async saveBrand(brand_name: string): Promise<void> {
      const newBrand = new BrandModel({
         brand_name
      })
      await newBrand.save()
   }
   async findBrandInEdit(_id: string, brand_name: string): Promise<Brand | null> {
      const existBrand = await BrandModel.findOne({ _id: { $ne: _id }, brand_name:{$regex:new RegExp(`^${brand_name}$`,"i")} })
      return existBrand ? (existBrand as Brand) : null
   }
   async updateBrandById(_id: string, brand_name: string): Promise<void> {
      await BrandModel.findByIdAndUpdate(_id, { brand_name })
   }
   async deleteBrandById(_id: string): Promise<void> {
      await BrandModel.findByIdAndDelete(_id)
   }
   async findAllListBrand(page: number, search: string): Promise<{ getBrandData: any[]; totalPage: number; }> {
      const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const brandList = await BrandModel.find({ brand_name: { $regex: searchRegex } }).skip(skip).limit(5)
      const totalPage = await BrandModel.countDocuments() / 5
      return {
         getBrandData: brandList,
         totalPage
      }
   }
}
