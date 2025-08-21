import { ICategoryModelEntity } from "../../domain/Entities/modelEntities/category.entity";
import { ICategorymapper } from "../../domain/mappers/ICategory.mapper";
import { categoryListDTO, idCategorynameDTO } from "../dto/category.dto";

export class categoryMapper implements ICategorymapper {
   toIdnameCategory(category: ICategoryModelEntity[]): idCategorynameDTO[] {
      return category.map((item) => ({
         _id: item._id,
         category_name: item.category_name
      }))
   }
   toListCategoryDTO(category: ICategoryModelEntity[]): categoryListDTO[] {
      return category.map((item) => ({
         _id: item._id,
         category_name: item.category_name,
         description: item.description
      }))
   }
}