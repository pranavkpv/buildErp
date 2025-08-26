import { SpecificationMapper } from "../../application/Mapper/specification.mapper";
import { FindlabourSumUsecase } from "../../application/UseCase/Material/FindLabourSum";
import { FindmaterialSumUseCase } from "../../application/UseCase/Material/FindMaterialSum";
import { DeleteSpecUseCase } from "../../application/UseCase/Specification/DeleteSpecification";
import { GetSpecUseCase } from "../../application/UseCase/Specification/GetSpecification";
import { SpeclistUseCase } from "../../application/UseCase/Specification/SpecificationList";
import { SaveSpecUseCase } from "../../application/UseCase/Specification/SpecificationSave";
import { SpecSumUseCase } from "../../application/UseCase/Specification/SpecificationSum";
import { UpdateSpecUseCase } from "../../application/UseCase/Specification/UpdateSpecification";
import { EstimationRepository } from "../../infrastructure/Repositories/Estimation";
import { LabourRepository } from "../../infrastructure/Repositories/Labour";
import { MaterialRepository } from "../../infrastructure/Repositories/Material";
import { SpecRepository } from "../../infrastructure/Repositories/Specification";
import { SpecController } from "../controllers/Specification";

const specRepository = new SpecRepository()
const specificationMapper = new SpecificationMapper()
const materialRepository = new MaterialRepository()
const labourRepository = new LabourRepository()
const estimationRepostory = new EstimationRepository()
const getSpecUseCase = new GetSpecUseCase(specRepository,specificationMapper)
const findMaterialSumUseCase = new FindmaterialSumUseCase(materialRepository)
const findLabourSumUseCase = new FindlabourSumUsecase(labourRepository)
const specListUseCase = new SpeclistUseCase(specRepository)
const saveSpecUseCase = new SaveSpecUseCase(specRepository)
const specSumUseCase = new SpecSumUseCase(materialRepository,labourRepository)
const deleteSpecUseCase = new DeleteSpecUseCase(specRepository,estimationRepostory)
const updateSpecUseCase = new UpdateSpecUseCase(specRepository)
export const injectSpecController = new SpecController(getSpecUseCase,findMaterialSumUseCase,findLabourSumUseCase,specListUseCase,saveSpecUseCase,specSumUseCase,deleteSpecUseCase,updateSpecUseCase)