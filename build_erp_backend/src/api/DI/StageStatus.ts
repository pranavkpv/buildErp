import { Stagemapper } from '../../application/Mapper/stage.mapper';
import { FetchStageByProjectUseCase } from '../../application/UseCase/Stage/FetchStageByProject';
import { StageStatusChangeUseCase } from '../../application/UseCase/StageStatusUpdation/StageSatusChange';
import { UploadStatusImageUseCase } from '../../application/UseCase/StageStatusUpdation/UploadStatusImage';
import { StageRepository } from '../../infrastructure/Repositories/Stage';
import { StatusController } from '../controllers/StageStatus';

const stagerepository = new StageRepository();
const stagemapper = new Stagemapper();
const stageStatusChangeUseCase = new StageStatusChangeUseCase(stagerepository);
const uploadStatusImageUseCase = new UploadStatusImageUseCase(stagerepository);
const fetchStageByprojectUsecase = new FetchStageByProjectUseCase(stagerepository,stagemapper);
export const injectedStageStatusController = new StatusController(stageStatusChangeUseCase,uploadStatusImageUseCase,fetchStageByprojectUsecase);