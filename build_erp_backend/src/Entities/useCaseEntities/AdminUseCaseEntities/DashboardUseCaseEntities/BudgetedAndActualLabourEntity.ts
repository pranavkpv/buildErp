import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { budgetOutput } from "../../../../DTO/DashboardEntities/BudgetVsActualEntity";

export interface IBudgetAndActualLabourUseCaseEntity {
    execute(search:string): Promise<budgetOutput | commonOutput>
}