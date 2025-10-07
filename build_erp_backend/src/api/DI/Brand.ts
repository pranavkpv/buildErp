import { Brandmapper } from '../../application/Mapper/brand.mapper';
import { DeleteBrandUseCase } from '../../application/UseCase/Brand/DeleteBrand';
import { DisplayAllBrandUseCase } from '../../application/UseCase/Brand/DisplayAllBrand';
import { SaveBrandUseCase } from '../../application/UseCase/Brand/SaveBrand';
import { UpdateBrandUseCase } from '../../application/UseCase/Brand/UpdateBrand';
import { BrandRepository } from '../../infrastructure/Repositories/Brand';
import { MaterialRepository } from '../../infrastructure/Repositories/Material';
import { BrandController } from '../controllers/Brand.controller';

const brandRepository = new BrandRepository();
const materialRepository = new MaterialRepository();
const brandmapper = new Brandmapper();
const saveBrandUseCase = new SaveBrandUseCase(brandRepository);
const deleteBrandUseCase = new DeleteBrandUseCase(brandRepository,materialRepository);
const getAllBrandsUseCase = new DisplayAllBrandUseCase(brandRepository,brandmapper);
const updateBrandUseCase = new UpdateBrandUseCase(brandRepository);
export const injectedBrandController = new BrandController(saveBrandUseCase,deleteBrandUseCase,getAllBrandsUseCase,updateBrandUseCase);