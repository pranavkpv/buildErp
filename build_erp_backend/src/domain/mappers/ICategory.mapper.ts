import { categoryListDTO, idCategorynameDTO } from '../../application/dto/category.dto';
import { ICategoryModelEntity } from '../Entities/modelEntities/category.entity';

export interface ICategorymapper {
   toIdnameCategory(category:ICategoryModelEntity[]):idCategorynameDTO[]
   toListCategoryDTO(category: ICategoryModelEntity[]): categoryListDTO[]
}