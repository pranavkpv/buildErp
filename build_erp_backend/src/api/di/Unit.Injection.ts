import { unitMapper } from "../../application/Mapper/unit.mapper";
import { deleteUnitUseCase } from "../../application/usecases/UnitUseCase/DeleteUnitUseCase";
import { DisplayAllUnitUseCase } from "../../application/usecases/UnitUseCase/DisplayAllUnitUseCase";
import { FetchUnitUseCase } from "../../application/usecases/UnitUseCase/FetchUnitUseCase";
import { SaveUnitUseCase } from "../../application/usecases/UnitUseCase/SaveUnitUseCase";
import { updateUnitUseCase } from "../../application/usecases/UnitUseCase/updateUnitUseCase";
import { MaterialRepository } from "../../infrastructure/repositories/MaterialRepository";
import { UnitRepository } from "../../infrastructure/repositories/UnitRepository";
import { unitController } from "../controllers/unit.controller";



const unitRepository = new UnitRepository()
const materialRepository = new MaterialRepository()
const unitmapper = new unitMapper()

const addUnitUseCase = new SaveUnitUseCase(unitRepository)
const deleteUnituseCase = new deleteUnitUseCase(unitRepository,materialRepository)
const fetchUnitUsecasedata = new FetchUnitUseCase(unitRepository,unitmapper)
const editUnitUseCase = new updateUnitUseCase(unitRepository)
const displayUnitUseCase = new DisplayAllUnitUseCase(unitRepository,unitmapper)

export const injectedUnitController = new unitController(addUnitUseCase,deleteUnituseCase,fetchUnitUsecasedata,editUnitUseCase,displayUnitUseCase)