import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { budgetOutput } from "../../../Input-OutputEntities/DashboardEntities/BudgetVsActualEntity";

export interface IBudgetAndActualUsecase {
   execute(search:string,page:number): Promise<budgetOutput | commonOutput>
}