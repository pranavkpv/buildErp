import { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import { Category } from "../../domain/types/category";
import CategoryModel from "../../models/CategoryModel";

export class CategorymongooseRepository implements ICategoryRepository {
   async findAllCategory(): Promise<Category[] | []> {
      const list = await CategoryModel.find({})
      return list ? (list as Category[]) : []
   }
   async findByCategoryName(category_name: string): Promise<Category | null> {
      const ExistCategory = await CategoryModel.findOne({ category_name:{$regex:new RegExp(`^${category_name}$`,"i")} })
      return ExistCategory ? (ExistCategory as Category) : null
   }
   async saveCategory(category_name: string, description: string): Promise<void> {
      const newCategory = new CategoryModel({
         category_name,
         description
      })
      await newCategory.save()
   }
   async findCategoryInEdit(_id: string, category_name: string): Promise<Category | null> {
      const existData = await CategoryModel.findOne({ _id: { $ne: _id }, category_name:{$regex:new RegExp(`^${category_name}$`,"i")}  })
      return existData ? (existData as Category) : null
   }
   async updateCategoryById(_id: string, category_name: string, description: string): Promise<void> {
      await CategoryModel.findByIdAndUpdate(_id, { category_name, description })
   }
   async deleteCategoryById(_id: string): Promise<void> {
      await CategoryModel.findByIdAndDelete(_id)
   }
   async findAllListCategory(page: number, search: string): Promise<{ getCategoryData: any[]; totalPage: number; }> {
      const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const categorList = await CategoryModel.find({category_name:{$regex:searchRegex}}).skip(skip).limit(5)
      const totalPage = await CategoryModel.countDocuments()/5
      return {
         getCategoryData:categorList,
         totalPage
      }
   }
}