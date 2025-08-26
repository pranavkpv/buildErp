import { JwtService } from "../../application/services/JwtService";
import { ApproveTransferUseCase } from "../../application/UseCase/Transfer/ApproveTransfer";
import { DeleteTransferUseCase } from "../../application/UseCase/Transfer/DeleteTransfer";
import { GetToProjectUseCase } from "../../application/UseCase/Transfer/GetToProject";
import { GetTransferUseCase } from "../../application/UseCase/Transfer/GetTransfer";
import { ReceiveTransferUseCase } from "../../application/UseCase/Transfer/ReceiveTransfer";
import { SaveTransferUsecase } from "../../application/UseCase/Transfer/SaveTransfer";
import { UpdateTransferUseCase } from "../../application/UseCase/Transfer/UpdateTransfer";
import { MaterialRepository } from "../../infrastructure/Repositories/Material";
import { ProjectRepository } from "../../infrastructure/Repositories/Project";
import { ProjectStockRepository } from "../../infrastructure/Repositories/ProjectStock";
import { TransferRepository } from "../../infrastructure/Repositories/Transfer";
import { TransferController } from "../controllers/Transfer";

const jwtService = new JwtService()
const projectStockRepository = new ProjectStockRepository()
const transferRepository = new TransferRepository()
const materialRepository = new MaterialRepository()
const projectRepository = new ProjectRepository()
const getTransferUseCase = new GetTransferUseCase(transferRepository)
const getToProjectUseCase = new GetToProjectUseCase(transferRepository)
const saveTransferUseCase = new SaveTransferUsecase(transferRepository,projectStockRepository,materialRepository,projectRepository)
const updateTransferUseCase = new UpdateTransferUseCase(transferRepository,projectStockRepository,materialRepository,projectRepository)
const deleteTransferUseCase = new DeleteTransferUseCase(transferRepository)
const approveTransferUseCase = new ApproveTransferUseCase(transferRepository,projectStockRepository,materialRepository,projectRepository)
const receiveTransferUseCase = new ReceiveTransferUseCase(transferRepository)
export const injectedTransferController = new TransferController(jwtService,getTransferUseCase,getToProjectUseCase,saveTransferUseCase,updateTransferUseCase,deleteTransferUseCase,approveTransferUseCase,receiveTransferUseCase)