import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { budgetOutput } from "../../../Input-OutputEntities/DashboardEntities/BudgetVsActualEntity";

export interface IBudgetAndActualMaterialUseCase {
    execute(search:string): Promise<budgetOutput | commonOutput>
}