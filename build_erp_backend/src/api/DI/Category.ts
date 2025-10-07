import { categoryMapper } from '../../application/Mapper/category.mapper';
import { DeleteCategoryUseCase } from '../../application/UseCase/Category/DeleteCategory';
import { DisplayAllCategoryUseCase } from '../../application/UseCase/Category/DisplayAllCategory';
import { SaveCategoryUseCase } from '../../application/UseCase/Category/SaveCategory';
import { UpdateCategoryUseCase } from '../../application/UseCase/Category/UpdateCategory';
import { CategoryRepository } from '../../infrastructure/Repositories/Category';
import { MaterialRepository } from '../../infrastructure/Repositories/Material';
import { CategoryController } from '../controllers/Category.controller';

const categoryRepository = new CategoryRepository();
const materialRepository = new MaterialRepository();
const categorymapper = new categoryMapper();
const addCategoryUseCase = new SaveCategoryUseCase(categoryRepository);
const displayAllCategoryUseCase = new DisplayAllCategoryUseCase(categoryRepository,categorymapper);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository,materialRepository);
export const injectedCategoryController = new CategoryController(addCategoryUseCase,displayAllCategoryUseCase,updateCategoryUseCase,deleteCategoryUseCase);