import { brandmapper } from "../../application/Mapper/brand.mapper";
import { categoryMapper } from "../../application/Mapper/category.mapper";
import { materialMapper } from "../../application/Mapper/material.mapper";
import { projectMapper } from "../../application/Mapper/project.mapper";
import { unitMapper } from "../../application/Mapper/unit.mapper";
import { AddMaterialUseCase } from "../../application/usecases/MaterialUseCase/AddMaterialUseCase";
import { DeleteMaterialUseCase } from "../../application/usecases/MaterialUseCase/DeleteMaterialUseCase";
import { DisplayAddMaterialDataUseCase } from "../../application/usecases/MaterialUseCase/DisplayAddMaterialUseCase";
import { DisplayAllMaterialUseCase } from "../../application/usecases/MaterialUseCase/DisplayAllMaterialUseCase";
import { FetchBrandByMaterialNameUsecase } from "../../application/usecases/MaterialUseCase/fetchBrandByMaterialName";
import { FetchMaterialByMaterialNameUseCasse } from "../../application/usecases/MaterialUseCase/FetchmaterialByMaterialName";
import { FetchMaterialUseCase } from "../../application/usecases/MaterialUseCase/FetchMaterialUseCase";
import { FetchUnitRateUseCase } from "../../application/usecases/MaterialUseCase/fetChUnitRateUseCase";
import { FindMaterialByIdUseCase } from "../../application/usecases/MaterialUseCase/FindMaterialByIdUseCase";
import { GetEditMaterialUseCase } from "../../application/usecases/MaterialUseCase/GetEditMaterialUseCase";
import { UpdateMaterialUseCase } from "../../application/usecases/MaterialUseCase/UpdateMaterialUseCase";
import { BrandRepository } from "../../infrastructure/repositories/BrandRepository";
import { CategoryRepository } from "../../infrastructure/repositories/CategoryRepository";
import { MaterialRepository } from "../../infrastructure/repositories/MaterialRepository";
import { ProjectStockRepository } from "../../infrastructure/repositories/ProjectStockRepository";
import { SpecRepository } from "../../infrastructure/repositories/SpecRepository";
import { UnitRepository } from "../../infrastructure/repositories/UnitRepository";
import { MaterialController } from "../controllers/Material";


const materialRepository = new MaterialRepository()
const materialmapper = new materialMapper()
const categoryRepository = new CategoryRepository()
const brandRepository = new BrandRepository()
const brandMapper = new brandmapper()
const categorymapper = new categoryMapper()
const projectmapper = new projectMapper()
const unitRepository = new UnitRepository()
const unitmapper = new unitMapper()
const projectStockRepository = new ProjectStockRepository()
const specRepository = new SpecRepository()

const displayAllMaterialUseCase = new DisplayAllMaterialUseCase(materialRepository,materialmapper)
const getAddMaterialUseCase = new DisplayAddMaterialDataUseCase(materialRepository,categoryRepository,brandRepository,unitRepository,unitmapper,brandMapper,categorymapper,projectmapper)
const getEditMaterialUseCase = new GetEditMaterialUseCase(materialRepository,projectStockRepository,materialmapper)

const saveMaterialUseCase = new AddMaterialUseCase(materialRepository,projectStockRepository)
const updateMaterialUseCase = new UpdateMaterialUseCase(materialRepository,projectStockRepository)
const deleteMaterialUseCase = new DeleteMaterialUseCase(materialRepository,projectStockRepository,specRepository)
const fetchMaterialUseCase = new FetchMaterialUseCase(materialRepository)
const fetchMaterialByMaterialName = new FetchMaterialByMaterialNameUseCasse(materialRepository)
const fetchbrandBynameusecase = new FetchBrandByMaterialNameUsecase(materialRepository)
const fetUnitRateUseCase = new FetchUnitRateUseCase(materialRepository)
const findMaterialByIdUsecase = new FindMaterialByIdUseCase(materialRepository)

export const injectedMaterialController = new MaterialController(displayAllMaterialUseCase,getAddMaterialUseCase,saveMaterialUseCase,
   getEditMaterialUseCase,updateMaterialUseCase,deleteMaterialUseCase,fetchMaterialUseCase,fetchMaterialByMaterialName,fetchbrandBynameusecase,
   fetUnitRateUseCase,findMaterialByIdUsecase )