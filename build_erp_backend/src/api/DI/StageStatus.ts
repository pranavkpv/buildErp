import { Server } from 'socket.io';
import { Stagemapper } from '../../application/Mapper/stage.mapper';
import { FetchStageByProjectUseCase } from '../../application/UseCase/Stage/FetchStageByProject';
import { StageStatusChangeUseCase } from '../../application/UseCase/StageStatusUpdation/StageSatusChange';
import { UploadStatusImageUseCase } from '../../application/UseCase/StageStatusUpdation/UploadStatusImage';
import { NotificationRepostory } from '../../infrastructure/Repositories/Notifiaction';
import { ProjectRepository } from '../../infrastructure/Repositories/Project';
import { StageRepository } from '../../infrastructure/Repositories/Stage';
import { StatusController } from '../controllers/StageStatus';

const stagerepository = new StageRepository();
const notificationRepository = new NotificationRepostory()
const projectRepository = new ProjectRepository()
const stagemapper = new Stagemapper();
const stageStatusChangeUseCase = new StageStatusChangeUseCase(stagerepository,notificationRepository,projectRepository);
const uploadStatusImageUseCase = new UploadStatusImageUseCase(stagerepository);
const fetchStageByprojectUsecase = new FetchStageByProjectUseCase(stagerepository,stagemapper);
export const injectedStageStatusController = new StatusController(stageStatusChangeUseCase,uploadStatusImageUseCase,fetchStageByprojectUsecase);