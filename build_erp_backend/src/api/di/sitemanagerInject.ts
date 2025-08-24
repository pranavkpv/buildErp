import { AttendanceMapper } from "../../application/Mapper/attenadnce.mapper"
import { stagemapper } from "../../application/Mapper/stage.mapper"
import { JwtService } from "../../application/services/JwtService"
import { addAttendanceUseCase } from "../../application/usecases/AttendanceUseCase/AddAttendanceUseCase"
import { ApproveAttendanceUseCase } from "../../application/usecases/AttendanceUseCase/approveAttendanceuseCase"
import { DeleteAttendanceUseCase } from "../../application/usecases/AttendanceUseCase/DeleteAttandanceUseCase"
import { EditAttendanceUseCase } from "../../application/usecases/AttendanceUseCase/EditAttendanceUseCase"
import { FetchAttendanceByIdUseCase } from "../../application/usecases/AttendanceUseCase/FetchAttendanceBYIdUseCase"
import { fetchAttendanceUseCase } from "../../application/usecases/AttendanceUseCase/FetchAttendanceUseCase"
import { ApprovePurchaseUseCase } from "../../application/usecases/PurchaseUseCase/ApprovePurchaseUseCase"
import { DeletePurchaseUseCase } from "../../application/usecases/PurchaseUseCase/DeletePurchaseUseCase"
import { GetPurchaseUseCase } from "../../application/usecases/PurchaseUseCase/GetpurchaseUseCase"
import { SavePurchaseUseCase } from "../../application/usecases/PurchaseUseCase/SavePurchaseUseCase"
import { UpdatePurchaseUseCase } from "../../application/usecases/PurchaseUseCase/UpdatePurchaseUseCase"
import { ApproveReceiveUseCase } from "../../application/usecases/ReceiveUseCase/ApproveReceiveUseCase"
import { DeleteReceiveUsecase } from "../../application/usecases/ReceiveUseCase/DeleteReceiveUseCase"
import { GetReceiveUseCase } from "../../application/usecases/ReceiveUseCase/GetReceiveUseCase"
import { SaveReceiveUseCase } from "../../application/usecases/ReceiveUseCase/SaveReceiveUseCase"
import { UpdateReceiveUsecase } from "../../application/usecases/ReceiveUseCase/UpdateReceiveUseCase"
import { UpdateSitemanagerPasswordUseCase } from "../../application/usecases/SitemanagerAuthenticationUseCase/UpdateSitemanagerPasswordUseCase"
import { FetchStatusUseCase } from "../../application/usecases/StageStatusUpdationUseCase/fetchstatus.usecase"
import { FetchUserUseCase } from "../../application/usecases/StageStatusUpdationUseCase/FetchUserUseCase"
import { StageStatusChangeUseCase } from "../../application/usecases/StageStatusUpdationUseCase/StageSatusChangeUseCase"
import { UploadStatusImageUseCase } from "../../application/usecases/StageStatusUpdationUseCase/UploadStatusImageUseCase"
import { ApproveTransferUseCase } from "../../application/usecases/TransferUseCase/ApproveTransferUseCase"
import { DeleteTransferUseCase } from "../../application/usecases/TransferUseCase/DeleteTransferUseCase"
import { GetToProjectUseCase } from "../../application/usecases/TransferUseCase/GetToProjectUseCase"
import { GetTransferUseCase } from "../../application/usecases/TransferUseCase/GetTransferUseCase"
import { ReceiveTransferUseCase } from "../../application/usecases/TransferUseCase/ReceiveTransferUseCase"
import { SaveTransferUsecase } from "../../application/usecases/TransferUseCase/SaveTransferUsecase"
import { UpdateTransferUseCase } from "../../application/usecases/TransferUseCase/UpdateTransferUseCase"
import { AttendanceRepository } from "../../infrastructure/repositories/AttendanceRepository"
import { MaterialRepository } from "../../infrastructure/repositories/MaterialRepository"
import { ProjectRepository } from "../../infrastructure/repositories/ProjectRepository"
import { ProjectStockRepository } from "../../infrastructure/repositories/ProjectStockRepository"
import { PurchaseRepository } from "../../infrastructure/repositories/PurchaseRepository"
import { ReceiveRepository } from "../../infrastructure/repositories/ReceiveRepository"
import { SitemanagerRepository } from "../../infrastructure/repositories/SitemanagerRepository"
import { StageRepository } from "../../infrastructure/repositories/StageRepository"
import { TransferRepository } from "../../infrastructure/repositories/TransferRepository"
import { BcryptHasher } from "../../infrastructure/secuirity/BcryptHasher"
import { AttendanceController } from "../controllers/Attendance"
import { ChatController } from "../controllers/ChatController"
import { PurchaseController } from "../controllers/Purchase"
import { ReceiveController } from "../controllers/Receive"
import { StatusController } from "../controllers/StageStatus"
import { TransferController } from "../controllers/Transfer"

const sitemanagerRepository = new SitemanagerRepository()
const hasher = new BcryptHasher()
const updateSitemanagerPassword = new UpdateSitemanagerPasswordUseCase(sitemanagerRepository,hasher)
export const injectedChangepasswordcontroller = new changePasswordController(updateSitemanagerPassword)

// ---------------------- Status Updation Injection ---------------------- //

const stageRepository = new StageRepository()
const uploadstatusImageusecase = new UploadStatusImageUseCase(stageRepository)
const stageStatusChangeUseCase = new StageStatusChangeUseCase(stageRepository)
export const injectedStatusController = new StatusController( stageStatusChangeUseCase,uploadstatusImageusecase)

// ---------------------- Labour Attendance  Injection ---------------------- //
const attendanceRepository = new AttendanceRepository()
const attendaneMapper = new AttendanceMapper()
const addAttendaceUseCase = new addAttendanceUseCase(attendanceRepository)
const fetchattendanceusecase = new fetchAttendanceUseCase(attendanceRepository)
const deleteattendanceUsecase = new DeleteAttendanceUseCase(attendanceRepository)
const approveattendanceuseCase = new ApproveAttendanceUseCase(attendanceRepository)
const fetchattendancebyIdusecase = new FetchAttendanceByIdUseCase(attendanceRepository,attendaneMapper)
const editAttendanceUseCase = new EditAttendanceUseCase(attendanceRepository)
export const injectAttendanceController = new AttendanceController(addAttendaceUseCase, fetchattendanceusecase, 
   deleteattendanceUsecase, approveattendanceuseCase, fetchattendancebyIdusecase, editAttendanceUseCase)

// ---------------------- Purchase  Injection ---------------------- //

const jwtService = new JwtService()
const purchaseRepository = new PurchaseRepository()
const projectStockRepository = new ProjectStockRepository()
const getPurchaseUsecase = new GetPurchaseUseCase(purchaseRepository)
const savePurchaseUseCase = new SavePurchaseUseCase(purchaseRepository)
const updatePurchaseUseCase = new UpdatePurchaseUseCase(purchaseRepository)
const DeletePurchasaeUseCase = new DeletePurchaseUseCase(purchaseRepository)
const approvePurchaseUseCase = new ApprovePurchaseUseCase(purchaseRepository, projectStockRepository)
export const injectedPurchaseController = new PurchaseController(getPurchaseUsecase, savePurchaseUseCase, jwtService, updatePurchaseUseCase, DeletePurchasaeUseCase, approvePurchaseUseCase)

// ---------------------- Transfer  Injection ---------------------- //

const transferRepository = new TransferRepository()
const materialRepository = new MaterialRepository()
const projectRepository = new ProjectRepository()
const getTransferUseCase = new GetTransferUseCase(transferRepository)
const getToprojectUseCase = new GetToProjectUseCase(transferRepository)
const saveTransferUsecase = new SaveTransferUsecase(transferRepository, projectStockRepository, materialRepository, projectRepository)
const updateTransferUseCase = new UpdateTransferUseCase(transferRepository, projectStockRepository, materialRepository, projectRepository)
const deleteTransferUseCase = new DeleteTransferUseCase(transferRepository)
const receiveTransferUseCase = new ReceiveTransferUseCase(transferRepository)
const approveTransferUseCase = new ApproveTransferUseCase(transferRepository, projectStockRepository, materialRepository, projectRepository)
export const injectedTransferController = new TransferController(jwtService, getTransferUseCase, getToprojectUseCase,
   saveTransferUsecase, updateTransferUseCase, deleteTransferUseCase, approveTransferUseCase,receiveTransferUseCase)

// ---------------------- Reveive  Injection ---------------------- //

const receiveRepository = new ReceiveRepository()
const saveRecieveUseCase = new SaveReceiveUseCase(receiveRepository,transferRepository)
const getReceiveUseCase = new GetReceiveUseCase(receiveRepository)
const updateReceiveUseCase = new UpdateReceiveUsecase(receiveRepository,transferRepository)
const deleteReceiveUseCase = new DeleteReceiveUsecase(receiveRepository,transferRepository)
const approveReceiveUseCase = new ApproveReceiveUseCase(receiveRepository,projectStockRepository)
export const injectedReceiveController = new ReceiveController(saveRecieveUseCase,getReceiveUseCase,updateReceiveUseCase,deleteReceiveUseCase,approveReceiveUseCase)


const fetchUseruseCase = new FetchUserUseCase(projectRepository)
export const injectedChatController = new ChatController(fetchUseruseCase,jwtService)