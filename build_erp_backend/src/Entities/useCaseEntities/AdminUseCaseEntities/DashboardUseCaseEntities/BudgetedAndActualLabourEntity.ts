import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { budgetOutput } from "../../../Input-OutputEntities/DashboardEntities/BudgetVsActualEntity";

export interface IBudgetAndActualLabourUseCase {
    execute(search:string): Promise<budgetOutput | commonOutput>
}