import { projectMapper } from "../../application/Mapper/project.mapper";
import { stagemapper } from "../../application/Mapper/stage.mapper";
import { FetchStatusUseCase } from "../../application/usecases/StageStatusUpdationUseCase/fetchstatus.usecase";
import { DeleteStageUseCase } from "../../application/usecases/StageUseCase/DeleteStageUseCase";
import { FetchCostUseCase } from "../../application/usecases/StageUseCase/FetchCostUseCase";
import { FetchStageUsecase } from "../../application/usecases/StageUseCase/FetchStageUseCase";
import { StageSaveUseCase } from "../../application/usecases/StageUseCase/StageSaveUseCase";
import { UpdateStageUseCase } from "../../application/usecases/StageUseCase/UpdateStageUseCase";
import { EstimationRepository } from "../../infrastructure/repositories/EstimationRepository";
import { ProjectRepository } from "../../infrastructure/repositories/ProjectRepository";
import { StageRepository } from "../../infrastructure/repositories/StageRepository";
import { StageController } from "../controllers/stage.controller";

const projectRepository = new ProjectRepository()
const stageRepository = new StageRepository()
const estimationReposiitory = new EstimationRepository()
const projectmapper = new projectMapper()
const stageMapper = new stagemapper()

const stagesaveusecase = new StageSaveUseCase(projectRepository,stageRepository)
const fetchCostusecase = new FetchCostUseCase(estimationReposiitory)
const fetchStageusecase = new FetchStageUsecase(projectRepository,projectmapper)
const deletestageusecase = new DeleteStageUseCase(stageRepository)
const updateStageUseCase = new UpdateStageUseCase(stageRepository,projectRepository)
const fetchStatusUseCase = new FetchStatusUseCase(stageRepository,stageMapper)

export const injectStageController = new StageController(stagesaveusecase,fetchCostusecase,fetchStageusecase,deletestageusecase,
   updateStageUseCase,fetchStatusUseCase)