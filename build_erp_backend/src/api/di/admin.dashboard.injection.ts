import { BudgetAndActualLabourUseCase } from "../../application/usecases/AdminUseCase/BudgetAndActualLabourUseCase";
import { BudgetAndActualMaterialUseCase } from "../../application/usecases/AdminUseCase/BudgetAndActualMaterialUsecase";
import { BudgetAndActualUseCase } from "../../application/usecases/AdminUseCase/BudgetAndActualUseCase";
import { AttendanceRepository } from "../../infrastructure/repositories/AttendanceRepository";
import { EstimationRepository } from "../../infrastructure/repositories/EstimationRepository";
import { ProjectRepository } from "../../infrastructure/repositories/ProjectRepository";
import { PurchaseRepository } from "../../infrastructure/repositories/PurchaseRepository";
import { ReceiveRepository } from "../../infrastructure/repositories/ReceiveRepository";
import { TransferRepository } from "../../infrastructure/repositories/TransferRepository";
import { AdminDashboardController } from "../controllers/AdminDashboard";

const projectRepository = new ProjectRepository()
const purchaseRepository = new PurchaseRepository()
const transferRepository = new TransferRepository()
const receiveRepository = new ReceiveRepository()
const attendanceRepository = new AttendanceRepository()
const estimationRepository = new EstimationRepository()

const budgetAndActualusecase = new BudgetAndActualUseCase(projectRepository,purchaseRepository,transferRepository,receiveRepository,attendanceRepository)
const bugetAndActualMaterialUseCase = new BudgetAndActualMaterialUseCase(estimationRepository,projectRepository,purchaseRepository,transferRepository,receiveRepository)
const bugetAndActualLabourUseCase = new BudgetAndActualLabourUseCase(estimationRepository,projectRepository,attendanceRepository)

export const injectAdminDashboardController = new AdminDashboardController(budgetAndActualusecase,bugetAndActualMaterialUseCase,bugetAndActualLabourUseCase)