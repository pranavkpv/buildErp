import { brandmapper } from "../../application/Mapper/brand.mapper";
import { DeleteBrandUseCase } from "../../application/usecases/BrandUseCases/DeleteBrandUseCase";
import { DisplayAllBrandUseCase } from "../../application/usecases/BrandUseCases/DisplayAllBrandUseCase";
import { SaveBrandUseCase } from "../../application/usecases/BrandUseCases/SaveBrandUseCase";
import { UpdateBrandUseCase } from "../../application/usecases/BrandUseCases/UpdateBrandUseCase";
import { BrandRepository } from "../../infrastructure/repositories/BrandRepository";
import { MaterialRepository } from "../../infrastructure/repositories/MaterialRepository";
import { BrandController } from "../controllers/Brand.Controller/brand.controller";

const  brandRepository = new BrandRepository()
const materialRepository = new MaterialRepository()
const brandMapper = new brandmapper()

const addBrandUseCase = new SaveBrandUseCase(brandRepository)
const deleteBrandUseCase = new DeleteBrandUseCase(brandRepository,materialRepository)
const displayBrandUseCase = new DisplayAllBrandUseCase(brandRepository,brandMapper)
const editBrandUseCase = new UpdateBrandUseCase(brandRepository)

export const injectedBrandController = new BrandController(addBrandUseCase,deleteBrandUseCase,displayBrandUseCase,editBrandUseCase)