import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { budgetOutput } from "../../../../DTO/DashboardEntities/BudgetVsActualEntity";

export interface IBudgetAndActualUsecaseEntity {
   execute(search:string): Promise<budgetOutput | commonOutput>
}