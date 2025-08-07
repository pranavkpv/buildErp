import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { budgetOutput } from "../../../Entities/Input-OutputEntities/DashboardEntities/BudgetVsActualEntity";
import { IEstimationRepository } from "../../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IBudgetAndActualLabourUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetedAndActualLabourEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class BudgetAndActualLabourUseCase implements IBudgetAndActualLabourUseCase {
   private estimationRepository : IEstimationRepository
   private projectRepository: IprojectRepository
    private attendanceRepository: IAttendanceRepository
   constructor(projectRepository: IprojectRepository,
      estimationRepository : IEstimationRepository,
      attendanceRepository: IAttendanceRepository
   ) {
      this.projectRepository = projectRepository
      this.attendanceRepository = attendanceRepository
      this.estimationRepository = estimationRepository
   }
   async execute(search: string): Promise<budgetOutput | commonOutput> {
      try {
         const result = []
         const projectData = await this.projectRepository.fetchProject()
         for (let element of projectData) {
            result.push({ project_id: element._id, project_name: element.project_name, budgeted_cost: 0, actual_expense: 0 })
         }
         const estimateLabourData = await this.estimationRepository.findAllEstimationLabour()
         if (!estimateLabourData) return ResponseHelper.failure(ERROR_MESSAGE.DASHBOARD.ERROR, HTTP_STATUS.BAD_REQUEST)
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
          
         const attendanceData = await this.attendanceRepository.findAllAttendance()
         if (!attendanceData) return ResponseHelper.failure(ERROR_MESSAGE.DASHBOARD.ERROR, HTTP_STATUS.BAD_REQUEST)
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
         return {
            success: true,
            message: SUCCESS_MESSAGE.BUDGET_VS_ACTUAL.FETCH,
            status_code: HTTP_STATUS.OK,
            data: actualResult,
            totalPage: Math.ceil(actualResult.length / 5)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
} 