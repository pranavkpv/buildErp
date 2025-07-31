import { AttendanceRepository } from "../infrastructure/persistence/AttendanceRepository";
import { ProjectStockRepository } from "../infrastructure/persistence/ProjectStockRepository";
import { PurchaseRepository } from "../infrastructure/persistence/PurchaseRepository";
import { SitemanagerRepository } from "../infrastructure/persistence/SitemanagerRepository";
import { StageRepository } from "../infrastructure/persistence/StageRepository";
import { BcryptHasher } from "../infrastructure/secuirity/BcryptHasher";
import { AttendanceController } from "../infrastructure/web/controllers/sitemanager/AttendanceController";
import { changePasswordController } from "../infrastructure/web/controllers/sitemanager/changePasswordController";
import { PurchaseController } from "../infrastructure/web/controllers/sitemanager/PurchaseController";
import { statusController } from "../infrastructure/web/controllers/sitemanager/statusController";
import { JwtServiceImpl } from "../services/JwtService";
import { addAttendanceUseCase } from "../useCases/sitemanager/Attendance/AddAttendanceUseCase";
import { ApproveAttendanceUseCase } from "../useCases/sitemanager/Attendance/approveAttendanceuseCase";
import { DeleteAttendanceUseCase } from "../useCases/sitemanager/Attendance/DeleteAttandanceUseCase";
import { EditAttendanceUseCase } from "../useCases/sitemanager/Attendance/EditAttendanceUseCase";
import { FetchAttendanceByIdUseCase } from "../useCases/sitemanager/Attendance/FetchAttendanceBYIdUseCase";
import { fetchAttendanceUseCase } from "../useCases/sitemanager/Attendance/FetchAttendanceUseCase";
import { UpdateSitemanagerPasswordUseCase } from "../useCases/sitemanager/Authentication/UpdateSitemanagerPasswordUseCase";
import { GetPurchaseUseCase } from "../useCases/sitemanager/Purchase/GetpurchaseUseCase";
import { SavePurchaseUseCase } from "../useCases/sitemanager/Purchase/SavePurchaseUseCase";
import { FetchStatusUseCase } from "../useCases/sitemanager/StageStatusUpdation/FetchStatusUseCase";
import { StageStatusChangeUseCase } from "../useCases/sitemanager/StageStatusUpdation/StageSatusChangeUseCase";
import { UploadStatusImageUseCase } from "../useCases/sitemanager/StageStatusUpdation/UploadStatusImageUseCase";

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
const getPurchaseUsecase = new GetPurchaseUseCase(purchaseRepository)
const savePurchaseUseCase = new SavePurchaseUseCase(purchaseRepository)
export const injectedPurchaseController = new PurchaseController(getPurchaseUsecase,savePurchaseUseCase,jwtService)
