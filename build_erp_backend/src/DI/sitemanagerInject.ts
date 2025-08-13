import { AttendanceRepository } from "../infrastructure/persistence/AttendanceRepository";
import { MaterialRepository } from "../infrastructure/persistence/MaterialRepository";
import { ProjectRepository } from "../infrastructure/persistence/ProjectRepository";
import { ProjectStockRepository } from "../infrastructure/persistence/ProjectStockRepository";
import { PurchaseRepository } from "../infrastructure/persistence/PurchaseRepository";
import { ReceiveRepository } from "../infrastructure/persistence/ReceiveRepository";
import { SitemanagerRepository } from "../infrastructure/persistence/SitemanagerRepository";
import { StageRepository } from "../infrastructure/persistence/StageRepository";
import { TransferRepository } from "../infrastructure/persistence/TransferRepository";
import { BcryptHasher } from "../infrastructure/secuirity/BcryptHasher";
import { AttendanceController } from "../infrastructure/web/controllers/sitemanager/AttendanceController";
import { changePasswordController } from "../infrastructure/web/controllers/sitemanager/changePasswordController";
import { ChatController } from "../infrastructure/web/controllers/sitemanager/ChatController";
import { PurchaseController } from "../infrastructure/web/controllers/sitemanager/PurchaseController";
import { RecieveController } from "../infrastructure/web/controllers/sitemanager/RecieveController";
import { statusController } from "../infrastructure/web/controllers/sitemanager/statusController";
import { TransferController } from "../infrastructure/web/controllers/sitemanager/TransferController";
import { JwtService } from "../services/JwtService";
import { addAttendanceUseCase } from "../useCases/AttendanceUseCase/AddAttendanceUseCase";
import { ApproveAttendanceUseCase } from "../useCases/AttendanceUseCase/approveAttendanceuseCase";
import { DeleteAttendanceUseCase } from "../useCases/AttendanceUseCase/DeleteAttandanceUseCase";
import { EditAttendanceUseCase } from "../useCases/AttendanceUseCase/EditAttendanceUseCase";
import { FetchAttendanceByIdUseCase } from "../useCases/AttendanceUseCase/FetchAttendanceBYIdUseCase";
import { fetchAttendanceUseCase } from "../useCases/AttendanceUseCase/FetchAttendanceUseCase";
import { ApprovePurchaseUseCase } from "../useCases/PurchaseUseCase/ApprovePurchaseUseCase";
import { DeletePurchaseUseCase } from "../useCases/PurchaseUseCase/DeletePurchaseUseCase";
import { GetPurchaseUseCase } from "../useCases/PurchaseUseCase/GetpurchaseUseCase";
import { SavePurchaseUseCase } from "../useCases/PurchaseUseCase/SavePurchaseUseCase";
import { UpdatePurchaseUseCase } from "../useCases/PurchaseUseCase/UpdatePurchaseUseCase";
import { ApproveReceiveUseCase } from "../useCases/ReceiveUseCase/ApproveReceiveUseCase";
import { DeleteReceiveUsecase } from "../useCases/ReceiveUseCase/DeleteReceiveUseCase";
import { GetReceiveUseCase } from "../useCases/ReceiveUseCase/GetReceiveUseCase";
import { SaveReceiveUseCase } from "../useCases/ReceiveUseCase/SaveReceiveUseCase";
import { UpdateReceiveUsecase } from "../useCases/ReceiveUseCase/UpdateReceiveUseCase";
import { UpdateSitemanagerPasswordUseCase } from "../useCases/SitemanagerAuthenticationUseCase/UpdateSitemanagerPasswordUseCase";
import { FetchStatusUseCase } from "../useCases/StageStatusUpdationUseCase/FetchStatusUseCase";
import { FetchUserUseCase } from "../useCases/StageStatusUpdationUseCase/FetchUserUseCase";
import { StageStatusChangeUseCase } from "../useCases/StageStatusUpdationUseCase/StageSatusChangeUseCase";
import { UploadStatusImageUseCase } from "../useCases/StageStatusUpdationUseCase/UploadStatusImageUseCase";
import { ApproveTransferUseCase } from "../useCases/TransferUseCase/ApproveTransferUseCase";
import { DeleteTransferUseCase } from "../useCases/TransferUseCase/DeleteTransferUseCase";
import { GetToProjectUseCase } from "../useCases/TransferUseCase/GetToProjectUseCase";
import { GetTransferUseCase } from "../useCases/TransferUseCase/GetTransferUseCase";
import { ReceiveTransferUseCase } from "../useCases/TransferUseCase/ReceiveTransferUseCase";
import { SaveTransferUsecase } from "../useCases/TransferUseCase/SaveTransferUsecase";
import { UpdateTransferUseCase } from "../useCases/TransferUseCase/UpdateTransferUseCase";

// ---------------------- Change Password Injection ---------------------- //

const sitemanagerRepository = new SitemanagerRepository()
const hasher = new BcryptHasher()
const updateSitemanagerPassword = new UpdateSitemanagerPasswordUseCase(sitemanagerRepository,hasher)
export const injectedChangepasswordcontroller = new changePasswordController(updateSitemanagerPassword)

// ---------------------- Status Updation Injection ---------------------- //

const stageRepository = new StageRepository()
const uploadstatusImageusecase = new UploadStatusImageUseCase(stageRepository)
const fetchStatusUseCase = new FetchStatusUseCase(stageRepository)
const stageStatusChangeUseCase = new StageStatusChangeUseCase(stageRepository)
export const injectedStatusController = new statusController(fetchStatusUseCase, stageStatusChangeUseCase, uploadstatusImageusecase)

// ---------------------- Labour Attendance  Injection ---------------------- //

const attendanceRepository = new AttendanceRepository()
const addAttendaceUseCase = new addAttendanceUseCase(attendanceRepository)
const fetchattendanceusecase = new fetchAttendanceUseCase(attendanceRepository)
const deleteattendanceUsecase = new DeleteAttendanceUseCase(attendanceRepository)
const approveattendanceuseCase = new ApproveAttendanceUseCase(attendanceRepository)
const fetchattendancebyIdusecase = new FetchAttendanceByIdUseCase(attendanceRepository)
const editAttendanceUseCase = new EditAttendanceUseCase(attendanceRepository)
export const injectAttendanceController = new AttendanceController(addAttendaceUseCase, fetchattendanceusecase, deleteattendanceUsecase, approveattendanceuseCase, fetchattendancebyIdusecase, editAttendanceUseCase)

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
export const injectedReceiveController = new RecieveController(saveRecieveUseCase,getReceiveUseCase,updateReceiveUseCase,deleteReceiveUseCase,approveReceiveUseCase)


const fetchUseruseCase = new FetchUserUseCase(projectRepository)
export const injectedChatController = new ChatController(fetchUseruseCase,jwtService)