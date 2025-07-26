import { categoryDB } from "../../Database/Model/CategoryModel";
import { ICategoryModelEntity } from "../../Entities/ModelEntities/Category.Entity";
import { ICategoryRepository } from "../../Entities/repositoryEntities/Material-management/ICategoryRepository";


export class CategoryRepository implements ICategoryRepository {
   async findAllCategory(): Promise<ICategoryModelEntity[] | []> {
      const list = await categoryDB.find({})
      return list 
   }
   async findByCategoryName(category_name: string): Promise<ICategoryModelEntity | null> {
      const ExistCategory = await categoryDB.findOne({ category_name:{$regex:new RegExp(`^${category_name}$`,"i")} })
      return ExistCategory 
   }
   async saveCategory(category_name: string, description: string): Promise<void> {
      const newCategory = new categoryDB({
         category_name,
         description
      })
      await newCategory.save()
   }
   async findCategoryInEdit(_id: string, category_name: string): Promise<ICategoryModelEntity | null> {
      const existData = await categoryDB.findOne({ _id: { $ne: _id }, category_name:{$regex:new RegExp(`^${category_name}$`,"i")}  })
      return existData 
   }
   async updateCategoryById(_id: string, category_name: string, description: string): Promise<void> {
      await categoryDB.findByIdAndUpdate(_id, { category_name, description })
   }
   async deleteCategoryById(_id: string): Promise<void> {
      await categoryDB.findByIdAndDelete(_id)
   }
   async findAllListCategory(page: number, search: string): Promise<{ getCategoryData: any[]; totalPage: number; }> {
      const skip = (page) * 5
      const searchRegex = new RegExp(search, "i");
      const categorList = await categoryDB.find({category_name:{$regex:searchRegex}}).skip(skip).limit(5)
      const totalPage = await categoryDB.countDocuments({category_name:{$regex:searchRegex}})/5
      return {
         getCategoryData:categorList,
         totalPage
      }
   }
}