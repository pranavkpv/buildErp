import { CategoryRepository } from "../infrastructure/persistence/CategoryRepository";
import { MaterialRepository } from "../infrastructure/persistence/MaterialRepository";
import { AddCategoryController } from "../infrastructure/web/controllers/Category.Controller/AddCategory.Controller";
import { DeletecategoryController } from "../infrastructure/web/controllers/Category.Controller/DeleteCategory.Controller";
import { EditCategoryController } from "../infrastructure/web/controllers/Category.Controller/EditCategory.Controller";
import { FetchCategoryListController } from "../infrastructure/web/controllers/Category.Controller/FetchCategoryList.Controller";
import { DeleteCategoryUseCase } from "../useCases/CategoryUseCases/DeleteCategoryUseCase";
import { DisplayAllCategoryUseCase } from "../useCases/CategoryUseCases/DisplayAllCategoryUseCase";
import { SaveCategoryUseCase } from "../useCases/CategoryUseCases/SaveCategoryUseCase";
import { UpdateCategoryUseCase } from "../useCases/CategoryUseCases/UpdateCategoryUseCase";

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