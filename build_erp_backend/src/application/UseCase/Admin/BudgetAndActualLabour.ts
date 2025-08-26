import { IBudgetAndActualLabourUseCase } from "../../IUseCases/IAdmin/IBudgetedAndActualLabour";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IEstimationRepository } from "../../../domain/Entities/IRepository/IEstimation";
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { IAttendanceRepository } from "../../../domain/Entities/IRepository/IAttendance";
import { userFailedMessage } from "../../../Shared/Messages/User.Message";
import { BudgetSuccessMessage } from "../../../Shared/Messages/BugetVsActual.Message";
import { commonOutput } from "../../dto/common";
import { budgetActualDTO } from "../../dto/admin.dashoard.dto";

export class BudgetAndActualLabourUseCase implements IBudgetAndActualLabourUseCase {
   constructor(
      private _estimationRepository: IEstimationRepository,
      private _projectRepository: IprojectRepository,
      private _attendanceRepository: IAttendanceRepository
   ) { }
   async execute(search: string):
      Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput> {
      const result = []
      const projectData = await this._projectRepository.getAllProjects()
      for (let element of projectData) {
         result.push({ project_id: element._id, project_name: element.project_name, budgeted_cost: 0, actual_expense: 0 })
      }
      const estimateLabourData = await this._estimationRepository.getAllEstimationLabours()
      if (!estimateLabourData) return ResponseHelper.badRequest(userFailedMessage.ERROR)
      if (Array.isArray(estimateLabourData)) {
         for (let element of estimateLabourData) {
            for (let item of result) {
               if (item.project_id == element.project_id) {
                  let labourSum = element.numberoflabour * element.daily_wage
                  item.budgeted_cost = (item.budgeted_cost || 0) + labourSum
               }
            }
         }
      }

      const attendanceData = await this._attendanceRepository.getApprovedAttendance()
      if (!attendanceData) return ResponseHelper.badRequest(userFailedMessage.ERROR)
      if (Array.isArray(attendanceData)) {
         for (let element of attendanceData) {
            for (let item of result) {
               if (item.project_id == element.project_id) {
                  let labourSum = element.labourDetails.reduce((sum, labour) => {
                     return sum += (labour.numberOflabour * labour.daily_wage)
                  }, 0)
                  item.actual_expense = (item.actual_expense || 0) + labourSum
               }
            }
         }
      }

      const actualResult = result.filter(item => item.project_name.includes(search || ""))
      return ResponseHelper.success(BudgetSuccessMessage.FETCH, { data: actualResult, totalPage: Math.ceil(actualResult.length / 5) })
   }
} 