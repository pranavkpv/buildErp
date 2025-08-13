import { MaterialRepository } from "../infrastructure/persistence/MaterialRepository";
import { UnitRepository } from "../infrastructure/persistence/UnitRepository";
import { AddUnitController } from "../infrastructure/web/controllers/Unit.Controller/AddUnit.Controller";
import { DeleteUnitController } from "../infrastructure/web/controllers/Unit.Controller/DeleteUnit.Controller";
import { DisplayAllUnitController } from "../infrastructure/web/controllers/Unit.Controller/DisplayAllUnit.Controller";
import { EditUnitController } from "../infrastructure/web/controllers/Unit.Controller/EditUnit.Controller";
import { GetUnitController } from "../infrastructure/web/controllers/Unit.Controller/GetUnit.Controller";
import { deleteUnitUseCase } from "../useCases/UnitUseCase/DeleteUnitUseCase";
import { DisplayAllUnitUseCase } from "../useCases/UnitUseCase/DisplayAllUnitUseCase";
import { FetchUnitUseCase } from "../useCases/UnitUseCase/FetchUnitUseCase";
import { SaveUnitUseCase } from "../useCases/UnitUseCase/SaveUnitUseCase";
import { updateUnitUseCase } from "../useCases/UnitUseCase/updateUnitUseCase";

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