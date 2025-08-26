import { StageStatusChangeUseCase } from "../../application/UseCase/StageStatusUpdation/StageSatusChange";
import { UploadStatusImageUseCase } from "../../application/UseCase/StageStatusUpdation/UploadStatusImage";
import { StageRepository } from "../../infrastructure/Repositories/Stage";
import { StatusController } from "../controllers/StageStatus";

const stagerepository = new StageRepository()
const stageStatusChangeUseCase = new StageStatusChangeUseCase(stagerepository)
const uploadStatusImageUseCase = new UploadStatusImageUseCase(stagerepository)
export const injectedStageStatusController = new StatusController(stageStatusChangeUseCase,uploadStatusImageUseCase)