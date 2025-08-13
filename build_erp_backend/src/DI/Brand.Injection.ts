import { BrandRepository } from "../infrastructure/persistence/BrandRepository";
import { MaterialRepository } from "../infrastructure/persistence/MaterialRepository";
import { AddBrandController } from "../infrastructure/web/controllers/Brand.Controller/AddBrand.Controller";
import { DeleteBrandController } from "../infrastructure/web/controllers/Brand.Controller/DeleteBrand.Controller";
import { DisplayBrandController } from "../infrastructure/web/controllers/Brand.Controller/DisplayBrand.Controller";
import { EditBrandController } from "../infrastructure/web/controllers/Brand.Controller/EditBrand.Controller";
import { DeleteBrandUseCase } from "../useCases/BrandUseCases/DeleteBrandUseCase";
import { DisplayAllBrandUseCase } from "../useCases/BrandUseCases/DisplayAllBrandUseCase";
import { SaveBrandUseCase } from "../useCases/BrandUseCases/SaveBrandUseCase";
import { UpdateBrandUseCase } from "../useCases/BrandUseCases/UpdateBrandUseCase";

const brandRepository = new BrandRepository()
const addBrandUseCase = new SaveBrandUseCase(brandRepository)
export const injectedAddBrandController = new AddBrandController(addBrandUseCase)

const materialRepository = new MaterialRepository()
const deleteBrandUseCase = new DeleteBrandUseCase(brandRepository,materialRepository)
export const injectedDeleteBrandController = new DeleteBrandController(deleteBrandUseCase)

const displayBrandUseCase = new DisplayAllBrandUseCase(brandRepository)
export const injectedDisplayBrandController = new DisplayBrandController(displayBrandUseCase)

const editBrandUseCase = new UpdateBrandUseCase(brandRepository)
export const injectedEditBrandController = new EditBrandController(editBrandUseCase)