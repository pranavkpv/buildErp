import { commonOutput } from "../../DTO/CommonEntities/common";
import { budgetOutput } from "../../DTO/DashboardEntities/BudgetVsActualEntity";
import { IBudgetAndActualLabourUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetedAndActualLabourEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IEstimationRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IAttendanceRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { userFailedMessage } from "../../Shared/Messages/User.Message";
import { BudgetSuccessMessage } from "../../Shared/Messages/BugetVsActual.Message";

export class BudgetAndActualLabourUseCase implements IBudgetAndActualLabourUseCaseEntity {
   private estimationRepository: IEstimationRepositoryEntity
   private projectRepository: IprojectRepositoryEntity
   private attendanceRepository: IAttendanceRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity,
      estimationRepository: IEstimationRepositoryEntity,
      attendanceRepository: IAttendanceRepositoryEntity
   ) {
      this.projectRepository = projectRepository
      this.attendanceRepository = attendanceRepository
      this.estimationRepository = estimationRepository
   }
   async execute(search: string): Promise<budgetOutput | commonOutput> {
      const result = []
      const projectData = await this.projectRepository.fetchProject()
      for (let element of projectData) {
         result.push({ project_id: element._id, project_name: element.project_name, budgeted_cost: 0, actual_expense: 0 })
      }
      const estimateLabourData = await this.estimationRepository.findAllEstimationLabour()
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

      const attendanceData = await this.attendanceRepository.findAllAttendance()
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
      return ResponseHelper.success(BudgetSuccessMessage.FETCH,actualResult,Math.ceil(actualResult.length / 5))
   }
} 