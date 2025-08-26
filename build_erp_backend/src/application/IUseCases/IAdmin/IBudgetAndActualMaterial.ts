import { budgetActualDTO } from "../../dto/admin.dashoard.dto";
import { commonOutput } from "../../dto/common";

export interface IBudgetAndActualMaterialUseCase {
    execute(search: string):
        Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput>
}