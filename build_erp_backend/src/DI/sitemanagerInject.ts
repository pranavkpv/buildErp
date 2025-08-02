import { AttendanceRepository } from "../infrastructure/persistence/AttendanceRepository";
import { MaterialRepository } from "../infrastructure/persistence/MaterialRepository";
import { ProjectRepository } from "../infrastructure/persistence/ProjectRepository";
import { ProjectStockRepository } from "../infrastructure/persistence/ProjectStockRepository";
import { PurchaseRepository } from "../infrastructure/persistence/PurchaseRepository";
import { SitemanagerRepository } from "../infrastructure/persistence/SitemanagerRepository";
import { StageRepository } from "../infrastructure/persistence/StageRepository";
import { TransferRepository } from "../infrastructure/persistence/TransferRepository";
import { BcryptHasher } from "../infrastructure/secuirity/BcryptHasher";
import { AttendanceController } from "../infrastructure/web/controllers/sitemanager/AttendanceController";
import { changePasswordController } from "../infrastructure/web/controllers/sitemanager/changePasswordController";
import { PurchaseController } from "../infrastructure/web/controllers/sitemanager/PurchaseController";
import { statusController } from "../infrastructure/web/controllers/sitemanager/statusController";
import { TransferController } from "../infrastructure/web/controllers/sitemanager/TransferController";
import { JwtServiceImpl } from "../services/JwtService";
import { addAttendanceUseCase } from "../useCases/sitemanager/Attendance/AddAttendanceUseCase";
import { ApproveAttendanceUseCase } from "../useCases/sitemanager/Attendance/approveAttendanceuseCase";
import { DeleteAttendanceUseCase } from "../useCases/sitemanager/Attendance/DeleteAttandanceUseCase";
import { EditAttendanceUseCase } from "../useCases/sitemanager/Attendance/EditAttendanceUseCase";
import { FetchAttendanceByIdUseCase } from "../useCases/sitemanager/Attendance/FetchAttendanceBYIdUseCase";
import { fetchAttendanceUseCase } from "../useCases/sitemanager/Attendance/FetchAttendanceUseCase";
import { UpdateSitemanagerPasswordUseCase } from "../useCases/sitemanager/Authentication/UpdateSitemanagerPasswordUseCase";
import { ApprovePurchaseUseCase } from "../useCases/sitemanager/Purchase/ApprovePurchaseUseCase";
import { DeletePurchaseUseCase } from "../useCases/sitemanager/Purchase/DeletePurchaseUseCase";
import { GetPurchaseUseCase } from "../useCases/sitemanager/Purchase/GetpurchaseUseCase";
import { SavePurchaseUseCase } from "../useCases/sitemanager/Purchase/SavePurchaseUseCase";
import { UpdatePurchaseUseCase } from "../useCases/sitemanager/Purchase/UpdatePurchaseUseCase";
import { FetchStatusUseCase } from "../useCases/sitemanager/StageStatusUpdation/FetchStatusUseCase";
import { StageStatusChangeUseCase } from "../useCases/sitemanager/StageStatusUpdation/StageSatusChangeUseCase";
import { UploadStatusImageUseCase } from "../useCases/sitemanager/StageStatusUpdation/UploadStatusImageUseCase";
import { ApproveTransferUseCase } from "../useCases/sitemanager/Transfer/ApproveTransferUseCase";
import { DeleteTransferUseCase } from "../useCases/sitemanager/Transfer/DeleteTransferUseCase";
import { GetToProjectUseCase } from "../useCases/sitemanager/Transfer/GetToProjectUseCase";
import { GetTransferUseCase } from "../useCases/sitemanager/Transfer/GetTransferUseCase";
import { SaveTransferUsecase } from "../useCases/sitemanager/Transfer/SaveTransferUsecase";
import { UpdateTransferUseCase } from "../useCases/sitemanager/Transfer/UpdateTransferUseCase";

// ---------------------- Change Password Injection ---------------------- //

const sitemanagerRepository = new SitemanagerRepository()
const hasher = new BcryptHasher()
const updateSitemanagerPassword = new UpdateSitemanagerPasswordUseCase(sitemanagerRepository, hasher)
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
 
const jwtService = new JwtServiceImpl()
const purchaseRepository = new PurchaseRepository()
const projectStockRepository = new ProjectStockRepository()
const getPurchaseUsecase = new GetPurchaseUseCase(purchaseRepository)
const savePurchaseUseCase = new SavePurchaseUseCase(purchaseRepository)
const updatePurchaseUseCase = new UpdatePurchaseUseCase(purchaseRepository)
const DeletePurchasaeUseCase = new DeletePurchaseUseCase(purchaseRepository)
const approvePurchaseUseCase = new ApprovePurchaseUseCase(purchaseRepository,projectStockRepository)
export const injectedPurchaseController = new PurchaseController(getPurchaseUsecase,savePurchaseUseCase,jwtService,updatePurchaseUseCase,DeletePurchasaeUseCase,approvePurchaseUseCase)

// ---------------------- Transfer  Injection ---------------------- //

const transferRepository = new TransferRepository()
const materialRepository = new MaterialRepository()
const projectRepository = new ProjectRepository()
const getTransferUseCase = new GetTransferUseCase(transferRepository)
const getToprojectUseCase = new GetToProjectUseCase(transferRepository)
const saveTransferUsecase = new SaveTransferUsecase(transferRepository,projectStockRepository,materialRepository,projectRepository)
const updateTransferUseCase = new UpdateTransferUseCase(transferRepository,projectStockRepository,materialRepository,projectRepository)
const deleteTransferUseCase = new DeleteTransferUseCase(transferRepository)
const approveTransferUseCase = new ApproveTransferUseCase(transferRepository,projectStockRepository,materialRepository,projectRepository)
export const injectedTransferController = new TransferController(jwtService,getTransferUseCase,getToprojectUseCase,
   saveTransferUsecase,updateTransferUseCase,deleteTransferUseCase,approveTransferUseCase)