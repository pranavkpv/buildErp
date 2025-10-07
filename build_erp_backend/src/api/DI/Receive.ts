import { ApproveReceiveUseCase } from '../../application/UseCase/Receive/ApproveReceive';
import { DeleteReceiveUsecase } from '../../application/UseCase/Receive/DeleteReceive';
import { GetReceiveUseCase } from '../../application/UseCase/Receive/GetReceive';
import { SaveReceiveUseCase } from '../../application/UseCase/Receive/SaveReceive';
import { UpdateReceiveUsecase } from '../../application/UseCase/Receive/UpdateReceive';
import { ProjectStockRepository } from '../../infrastructure/Repositories/ProjectStock';
import { ReceiveRepository } from '../../infrastructure/Repositories/Receive';
import { TransferRepository } from '../../infrastructure/Repositories/Transfer';
import { ReceiveController } from '../controllers/Receive.controller';

const receiveRepository = new ReceiveRepository();
const transferRepository = new TransferRepository();
const projectStockRepository = new ProjectStockRepository();
const saveReceiveUseCase = new SaveReceiveUseCase(receiveRepository,transferRepository);
const getReceiveUseCase = new GetReceiveUseCase(receiveRepository);
const updateReceiveUseCase = new UpdateReceiveUsecase(receiveRepository,transferRepository);
const deleteReceiveUseCase = new DeleteReceiveUsecase(receiveRepository,transferRepository);
const approveReceiveUseCase = new ApproveReceiveUseCase(receiveRepository,projectStockRepository);
export const injectedReceiveController = new ReceiveController(saveReceiveUseCase,getReceiveUseCase,updateReceiveUseCase,deleteReceiveUseCase,approveReceiveUseCase);