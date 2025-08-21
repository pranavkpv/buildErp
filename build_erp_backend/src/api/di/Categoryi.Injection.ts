import { categoryMapper } from "../../application/Mapper/category.mapper"
import { DeleteCategoryUseCase } from "../../application/usecases/CategoryUseCases/DeleteCategoryUseCase"
import { DisplayAllCategoryUseCase } from "../../application/usecases/CategoryUseCases/DisplayAllCategoryUseCase"
import { SaveCategoryUseCase } from "../../application/usecases/CategoryUseCases/SaveCategoryUseCase"
import { UpdateCategoryUseCase } from "../../application/usecases/CategoryUseCases/UpdateCategoryUseCase"
import { CategoryRepository } from "../../infrastructure/repositories/CategoryRepository"
import { MaterialRepository } from "../../infrastructure/repositories/MaterialRepository"
import { AddCategoryController } from "../controllers/Category.Controller/AddCategory.Controller"
import { DeletecategoryController } from "../controllers/Category.Controller/DeleteCategory.Controller"
import { EditCategoryController } from "../controllers/Category.Controller/EditCategory.Controller"
import { FetchCategoryListController } from "../controllers/Category.Controller/FetchCategoryList.Controller"


const categoryRepository = new CategoryRepository()
const addCategoryUseCase = new SaveCategoryUseCase(categoryRepository)
export const injectedAddCategoryController = new AddCategoryController(addCategoryUseCase)

const categorymapper = new categoryMapper()
const displayAllCategoryUseCase = new DisplayAllCategoryUseCase(categoryRepository,categorymapper)
export const injectedFetchCategoryListController = new FetchCategoryListController(displayAllCategoryUseCase)

const editcategoryUseCase = new UpdateCategoryUseCase(categoryRepository)
export const injectedEditCategoryController = new EditCategoryController(editcategoryUseCase)

const materialRepository = new MaterialRepository()
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository,materialRepository)
export const injectedDeleteCategoryController = new DeletecategoryController(deleteCategoryUseCase)