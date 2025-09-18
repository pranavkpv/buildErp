import Stripe from 'stripe';
import { MaterialMapper } from '../../application/Mapper/material.mapper';
import { JwtService } from '../../application/services/JwtService';
import { ApproveTransferUseCase } from '../../application/UseCase/Transfer/ApproveTransfer';
import { DeleteTransferUseCase } from '../../application/UseCase/Transfer/DeleteTransfer';
import { FetchStockListUseCase } from '../../application/UseCase/Transfer/FetchStockList';
import { GetToProjectUseCase } from '../../application/UseCase/Transfer/GetToProject';
import { GetTransferUseCase } from '../../application/UseCase/Transfer/GetTransfer';
import { GetUserBaseTransferUseCase } from '../../application/UseCase/Transfer/GetUserBaseTransfer';
import { ReceiveTransferUseCase } from '../../application/UseCase/Transfer/ReceiveTransfer';
import { RejectTransferUseCase } from '../../application/UseCase/Transfer/RejectTransfer';
import { SaveTransferUsecase } from '../../application/UseCase/Transfer/SaveTransfer';
import { UpdateTransferUseCase } from '../../application/UseCase/Transfer/UpdateTransfer';
import { MaterialRepository } from '../../infrastructure/Repositories/Material';
import { PaymentRepository } from '../../infrastructure/Repositories/Payment';
import { ProjectRepository } from '../../infrastructure/Repositories/Project';
import { ProjectStockRepository } from '../../infrastructure/Repositories/ProjectStock';
import { TransferRepository } from '../../infrastructure/Repositories/Transfer';
import { TransferController } from '../controllers/Transfer';
import { StageRepository } from '../../infrastructure/Repositories/Stage';

const jwtService = new JwtService();
const projectStockRepository = new ProjectStockRepository();
const transferRepository = new TransferRepository();
const materialRepository = new MaterialRepository();
const projectRepository = new ProjectRepository();
const materialMapper = new MaterialMapper()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-08-27.basil', 
});
const getTransferUseCase = new GetTransferUseCase(transferRepository);
const getToProjectUseCase = new GetToProjectUseCase(transferRepository);
const saveTransferUseCase = new SaveTransferUsecase(transferRepository,projectStockRepository,materialRepository,projectRepository);
const updateTransferUseCase = new UpdateTransferUseCase(transferRepository,projectStockRepository,materialRepository,projectRepository);
const deleteTransferUseCase = new DeleteTransferUseCase(transferRepository);
const paymentRepository = new PaymentRepository(stripe)
const stageRepository = new StageRepository()
const approveTransferUseCase = new ApproveTransferUseCase(transferRepository,projectStockRepository,materialRepository,projectRepository,paymentRepository,stageRepository);
const receiveTransferUseCase = new ReceiveTransferUseCase(transferRepository);
const fetchStockListUseCase = new FetchStockListUseCase(projectStockRepository,materialMapper)
const getUserBaseTransferUseCase = new GetUserBaseTransferUseCase(transferRepository)
const rejectTransferUseCase = new RejectTransferUseCase(transferRepository)
export const injectedTransferController = new TransferController(jwtService,getTransferUseCase,getToProjectUseCase,saveTransferUseCase,updateTransferUseCase,deleteTransferUseCase,approveTransferUseCase,
   receiveTransferUseCase,fetchStockListUseCase,getUserBaseTransferUseCase,rejectTransferUseCase);