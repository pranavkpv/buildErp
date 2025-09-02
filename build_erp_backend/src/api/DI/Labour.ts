import { LabourMapper } from '../../application/Mapper/labour.mapper';
import { AddLabourUseCase } from '../../application/UseCase/Labour/AddLabour';
import { DeleteLabourUseCase } from '../../application/UseCase/Labour/DeleteLabour';
import { DisplayAllLabourUseCase } from '../../application/UseCase/Labour/DisplayAllLabour';
import { FetchAllLabourUseCase } from '../../application/UseCase/Labour/FetchAllLabour';
import { FetchLabourByIdUseCase } from '../../application/UseCase/Labour/FetchLabourById';
import { UpdateLabourUseCase } from '../../application/UseCase/Labour/UpdateLabour';
import { AttendanceRepository } from '../../infrastructure/Repositories/Attendance';
import { LabourRepository } from '../../infrastructure/Repositories/Labour';
import { SpecRepository } from '../../infrastructure/Repositories/Specification';
import { LabourController } from '../controllers/Labour';

const labourRepository = new LabourRepository();
const labourmapper = new LabourMapper();
const specRepository = new SpecRepository();
const attendanceRepository = new AttendanceRepository()
const displayAllLabourUseCase = new DisplayAllLabourUseCase(labourRepository,labourmapper);
const addLabourUseCase = new AddLabourUseCase(labourRepository);
const updateLabourUseCase = new UpdateLabourUseCase(labourRepository);
const deleteLabourUseCase = new DeleteLabourUseCase(labourRepository,specRepository,attendanceRepository);
const fetchAllLabourUseCase = new FetchAllLabourUseCase(labourRepository,labourmapper);
const fetchLabourByIdUseCase = new FetchLabourByIdUseCase(labourRepository,labourmapper);
export const injectedLabourController = new LabourController(displayAllLabourUseCase,addLabourUseCase,updateLabourUseCase,deleteLabourUseCase,fetchAllLabourUseCase,fetchLabourByIdUseCase);