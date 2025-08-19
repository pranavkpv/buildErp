import { MaterialRepository } from "../infrastructure/repositories/MaterialRepository";
import { UnitRepository } from "../infrastructure/repositories/UnitRepository";
import { AddUnitController } from "../api/controllers/Unit.Controller/AddUnit.Controller";
import { DeleteUnitController } from "../api/controllers/Unit.Controller/DeleteUnit.Controller";
import { DisplayAllUnitController } from "../api/controllers/Unit.Controller/DisplayAllUnit.Controller";
import { EditUnitController } from "../api/controllers/Unit.Controller/EditUnit.Controller";
import { GetUnitController } from "../api/controllers/Unit.Controller/GetUnit.Controller";
import { deleteUnitUseCase } from "../application/usecases/UnitUseCase/DeleteUnitUseCase";
import { DisplayAllUnitUseCase } from "../application/usecases/UnitUseCase/DisplayAllUnitUseCase";
import { FetchUnitUseCase } from "../application/usecases/UnitUseCase/FetchUnitUseCase";
import { SaveUnitUseCase } from "../application/usecases/UnitUseCase/SaveUnitUseCase";
import { updateUnitUseCase } from "../application/usecases/UnitUseCase/updateUnitUseCase";

const unitRepository = new UnitRepository()
const addUnitUseCase = new SaveUnitUseCase(unitRepository)
export const injectedAddUnitController = new AddUnitController(addUnitUseCase)

const materialRepository = new MaterialRepository()
const DeleteUnitUseCase = new deleteUnitUseCase(unitRepository,materialRepository)
export const injectedDeleteUnitController = new DeleteUnitController(DeleteUnitUseCase)

const fetchUnitUseCase = new FetchUnitUseCase(unitRepository)
export const injectedDisplayAllUnitController = new DisplayAllUnitController(fetchUnitUseCase)

const editUnitUseCase = new updateUnitUseCase(unitRepository)
export const injectedEditUnitController = new EditUnitController(editUnitUseCase)

const displayUnitUseCase = new DisplayAllUnitUseCase(unitRepository)
export const injectedGetUnitController = new GetUnitController(displayUnitUseCase)