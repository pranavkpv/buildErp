import { EstimationMapper } from '../../application/Mapper/estimation.mapper';
import { ProjectMapper } from '../../application/Mapper/project.mapper';
import {  SendEstimationUseCase } from '../../application/UseCase/Estimation/SendEstimation';
import { DisplayEstimationUseCase } from '../../application/UseCase/Estimation/DisplayEstimation';
import { FetchSpecListinEstimationUsecase } from '../../application/UseCase/Estimation/FetchSpecListUsingEstimation';
import { SaveEstimationUseCase } from '../../application/UseCase/Estimation/SaveEstimation';
import { UpdateEstimationUsecase } from '../../application/UseCase/Estimation/UpdateEstimation';
import { UploadEstimateImageUseCase } from '../../application/UseCase/Estimation/UploadEstimateImage';
import { SaveRequirementUseCase } from '../../application/UseCase/Requirement/SaveRequirement';
import { UpdateEstimationByUseCase } from '../../application/UseCase/Requirement/UpdateEstimationBy';
import { BrandRepository } from '../../infrastructure/Repositories/Brand';
import { EstimationRepository } from '../../infrastructure/Repositories/Estimation';
import { LabourRepository } from '../../infrastructure/Repositories/Labour';
import { MaterialRepository } from '../../infrastructure/Repositories/Material';
import { ProjectRepository } from '../../infrastructure/Repositories/Project';
import { SpecRepository } from '../../infrastructure/Repositories/Specification';
import { StageRepository } from '../../infrastructure/Repositories/Stage';
import { EstimationController } from '../controllers/Estimation';
import { RequirementController } from '../controllers/Requirement';
import { GetEstimationByProjectUseCase } from '../../application/UseCase/Estimation/GetEstimationByProject';
import { GetMaterialEstimationUseCase } from '../../application/UseCase/Estimation/GetMaterialEstimation';
import { GetAdditionEstimationUseCase } from '../../application/UseCase/Estimation/GetAddtionEstimation';
import { GetLabourEstimationUseCase } from '../../application/UseCase/Estimation/GetLabourEstimation';
import { RejectEstimationUsecase } from '../../application/UseCase/Estimation/RejectEstimation';
import { ApproveEstimationUseCase } from '../../application/UseCase/Estimation/ApproveEstimation';
import { GetEstimationImageUsecase } from '../../application/UseCase/Estimation/GetEstimationImage';

const estimationRepository = new EstimationRepository();
const stageRepository = new StageRepository();
const estimationMapper = new EstimationMapper();
const projectRepository = new ProjectRepository();
const saveEstimationUseCase = new SaveEstimationUseCase(estimationRepository,projectRepository);
const sendEstimationUseCase = new SendEstimationUseCase(estimationRepository,stageRepository,projectRepository);
const updateEstimationUseCase = new UpdateEstimationUsecase(estimationRepository,stageRepository);
const displayEstimationUseCase = new DisplayEstimationUseCase(estimationRepository,estimationMapper);
const uploadEstimationUseCase = new UploadEstimateImageUseCase(projectRepository);
const getEstimationByProjectUsecase = new GetEstimationByProjectUseCase(estimationRepository,estimationMapper);
const fetchSpecListUsingEstimationUseCase = new FetchSpecListinEstimationUsecase(estimationRepository,estimationMapper);
const getMaterialEstimationUseCase = new GetMaterialEstimationUseCase(estimationRepository,estimationMapper);
const getAdditionEstimationUseCase = new GetAdditionEstimationUseCase(estimationRepository,estimationMapper);
const getLabourEstimationUseCase = new GetLabourEstimationUseCase(estimationRepository,estimationMapper);
const rejectEstimationUseCase = new RejectEstimationUsecase(projectRepository,estimationRepository);
const approveEstimationUseCase = new ApproveEstimationUseCase(estimationRepository,projectRepository);
const getEstimationImageUseCase = new GetEstimationImageUsecase(projectRepository)
export const injectEstimationController = new EstimationController(saveEstimationUseCase,sendEstimationUseCase,updateEstimationUseCase,displayEstimationUseCase,
    uploadEstimationUseCase,fetchSpecListUsingEstimationUseCase,getEstimationByProjectUsecase,getMaterialEstimationUseCase,getAdditionEstimationUseCase,
    getLabourEstimationUseCase,rejectEstimationUseCase,approveEstimationUseCase,getEstimationImageUseCase);

const specRepository = new SpecRepository();
const brandRepository = new BrandRepository();
const materialRepository = new MaterialRepository();
const labourRepository = new LabourRepository();
const projectmapper = new ProjectMapper();
const updateEstimationByUseCase = new UpdateEstimationByUseCase(projectRepository,projectmapper);
const saveRequirement = new SaveRequirementUseCase(estimationRepository,specRepository,brandRepository,materialRepository,labourRepository,projectRepository,projectmapper);
export const injectedRequirementController = new RequirementController(saveRequirement,updateEstimationByUseCase);