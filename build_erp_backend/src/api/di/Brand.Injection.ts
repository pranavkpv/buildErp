import { BrandRepository } from "../infrastructure/repositories/BrandRepository";
import { MaterialRepository } from "../infrastructure/repositories/MaterialRepository";
import { AddBrandController } from "../api/controllers/Brand.Controller/AddBrand.Controller";
import { DeleteBrandController } from "../api/controllers/Brand.Controller/DeleteBrand.Controller";
import { DisplayBrandController } from "../api/controllers/Brand.Controller/DisplayBrand.Controller";
import { EditBrandController } from "../api/controllers/Brand.Controller/EditBrand.Controller";
import { DeleteBrandUseCase } from "../application/usecases/BrandUseCases/DeleteBrandUseCase";
import { DisplayAllBrandUseCase } from "../application/usecases/BrandUseCases/DisplayAllBrandUseCase";
import { SaveBrandUseCase } from "../application/usecases/BrandUseCases/SaveBrandUseCase";
import { UpdateBrandUseCase } from "../application/usecases/BrandUseCases/UpdateBrandUseCase";

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