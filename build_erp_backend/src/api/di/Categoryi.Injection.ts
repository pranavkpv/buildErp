import { CategoryRepository } from "../infrastructure/repositories/CategoryRepository";
import { MaterialRepository } from "../infrastructure/repositories/MaterialRepository";
import { AddCategoryController } from "../api/controllers/Category.Controller/AddCategory.Controller";
import { DeletecategoryController } from "../api/controllers/Category.Controller/DeleteCategory.Controller";
import { EditCategoryController } from "../api/controllers/Category.Controller/EditCategory.Controller";
import { FetchCategoryListController } from "../api/controllers/Category.Controller/FetchCategoryList.Controller";
import { DeleteCategoryUseCase } from "../application/usecases/CategoryUseCases/DeleteCategoryUseCase";
import { DisplayAllCategoryUseCase } from "../application/usecases/CategoryUseCases/DisplayAllCategoryUseCase";
import { SaveCategoryUseCase } from "../application/usecases/CategoryUseCases/SaveCategoryUseCase";
import { UpdateCategoryUseCase } from "../application/usecases/CategoryUseCases/UpdateCategoryUseCase";

const categoryRepository = new CategoryRepository()
const addCategoryUseCase = new SaveCategoryUseCase(categoryRepository)
export const injectedAddCategoryController = new AddCategoryController(addCategoryUseCase)

const displayAllCategoryUseCase = new DisplayAllCategoryUseCase(categoryRepository)
export const injectedFetchCategoryListController = new FetchCategoryListController(displayAllCategoryUseCase)

const editcategoryUseCase = new UpdateCategoryUseCase(categoryRepository)
export const injectedEditCategoryController = new EditCategoryController(editcategoryUseCase)

const materialRepository = new MaterialRepository()
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository,materialRepository)
export const injectedDeleteCategoryController = new DeletecategoryController(deleteCategoryUseCase)