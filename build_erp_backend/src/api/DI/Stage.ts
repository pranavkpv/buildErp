import Stripe from 'stripe';
import { ProjectMapper } from '../../application/Mapper/project.mapper';
import { Stagemapper } from '../../application/Mapper/stage.mapper';
import { DeleteStageUseCase } from '../../application/UseCase/Stage/DeleteStage';
import { FetchCostUseCase } from '../../application/UseCase/Stage/FetchCost';
import { FetchStageUsecase } from '../../application/UseCase/Stage/FetchStage';
import { HandleWebhookUseCase } from '../../application/UseCase/Stage/HandleWebhook';
import { PaymentIntendCreationUseCase } from '../../application/UseCase/Stage/PaymentIntendCreation';
import { StageSaveUseCase } from '../../application/UseCase/Stage/StageSave';
import { UpdateStageUseCase } from '../../application/UseCase/Stage/UpdateStage';
import { FetchStatusUseCase } from '../../application/UseCase/StageStatusUpdation/FetchStageStatus';
import { EstimationRepository } from '../../infrastructure/Repositories/Estimation';
import { PaymentRepository } from '../../infrastructure/Repositories/Payment';
import { ProjectRepository } from '../../infrastructure/Repositories/Project';
import { StageRepository } from '../../infrastructure/Repositories/Stage';
import { StageController } from '../controllers/Stage';
import { FetchStageForVerifyUseCase } from '../../application/UseCase/Stage/FetchStageForVerify';
import { VerifyPaymentUseCase } from '../../application/UseCase/Stage/VerifyPayment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-08-27.basil', 
});

const projectRepository = new ProjectRepository();
const stageRepository = new StageRepository();
const estimationReposiitory = new EstimationRepository();
const projectmapper = new ProjectMapper();
const stagemapper = new Stagemapper();
const paymentRepository = new PaymentRepository(stripe)

const stageSaveUseCase = new StageSaveUseCase(projectRepository,stageRepository);
const fetchCostUseCase = new FetchCostUseCase(estimationReposiitory);
const fetchStageUseCase = new FetchStageUsecase(projectRepository,projectmapper);
const deleteStageUseCase = new DeleteStageUseCase(stageRepository);
const updateStageUseCase = new UpdateStageUseCase(stageRepository,projectRepository);
const fetchStatusUseCase = new FetchStatusUseCase(stageRepository,stagemapper);
const payIntentCreationUseCase = new PaymentIntendCreationUseCase(stageRepository,paymentRepository)
const handleWebhookUseCase = new HandleWebhookUseCase(paymentRepository,stageRepository)
const fetchStageForVerifyUseCase = new FetchStageForVerifyUseCase(paymentRepository,stagemapper)
const verifyPaymentUseCase = new VerifyPaymentUseCase(paymentRepository,stageRepository)

export const injectStageController = new StageController(stageSaveUseCase,fetchCostUseCase,fetchStageUseCase,deleteStageUseCase,updateStageUseCase,
   fetchStatusUseCase,payIntentCreationUseCase,handleWebhookUseCase,fetchStageForVerifyUseCase,verifyPaymentUseCase);