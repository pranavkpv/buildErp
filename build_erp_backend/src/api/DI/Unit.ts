import { UnitMapper } from '../../application/Mapper/unit.mapper';
import { DeleteUnitUseCase } from '../../application/UseCase/Unit/DeleteUnit';
import { DisplayAllUnitUseCase } from '../../application/UseCase/Unit/DisplayAllUnit';
import { FetchUnitUseCase } from '../../application/UseCase/Unit/FetchUnit';
import { SaveUnitUseCase } from '../../application/UseCase/Unit/SaveUnit';
import { UpdateUnitUseCase } from '../../application/UseCase/Unit/UpdateUnit';
import { MaterialRepository } from '../../infrastructure/Repositories/Material';
import { UnitRepository } from '../../infrastructure/Repositories/Unit';
import { UnitController } from '../controllers/Unit.controller';

const unitRepository = new UnitRepository();
const materialRepository = new MaterialRepository();
const unitmapper = new UnitMapper();
const addUnitUseCase = new SaveUnitUseCase(unitRepository);
const deleteUnitUseCase = new DeleteUnitUseCase(unitRepository,materialRepository);
const fetchUnitUseCase = new FetchUnitUseCase(unitRepository,unitmapper);
const updateUnitUseCase = new UpdateUnitUseCase(unitRepository);
const displayUnitUseCase = new DisplayAllUnitUseCase(unitRepository,unitmapper);
export const injectedUnitController = new UnitController(addUnitUseCase,deleteUnitUseCase,fetchUnitUseCase,updateUnitUseCase,displayUnitUseCase);