import { categoryMapper } from "../../application/Mapper/category.mapper"
import { DeleteCategoryUseCase } from "../../application/usecases/CategoryUseCases/DeleteCategoryUseCase"
import { DisplayAllCategoryUseCase } from "../../application/usecases/CategoryUseCases/DisplayAllCategoryUseCase"
import { SaveCategoryUseCase } from "../../application/usecases/CategoryUseCases/SaveCategoryUseCase"
import { UpdateCategoryUseCase } from "../../application/usecases/CategoryUseCases/UpdateCategoryUseCase"
import { CategoryRepository } from "../../infrastructure/repositories/CategoryRepository"
import { MaterialRepository } from "../../infrastructure/repositories/MaterialRepository"
import { CategoryController } from "../controllers/Category"


const categoryRepository = new CategoryRepository()
const categorymapper = new categoryMapper()
const materialRepository = new MaterialRepository()
const addCategoryUseCase = new SaveCategoryUseCase(categoryRepository)
const displayAllCategoryUseCase = new DisplayAllCategoryUseCase(categoryRepository,categorymapper)
const editcategoryUseCase = new UpdateCategoryUseCase(categoryRepository)
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository,materialRepository)
export const injectedCategoryController = new CategoryController(addCategoryUseCase,displayAllCategoryUseCase,editcategoryUseCase,deleteCategoryUseCase)