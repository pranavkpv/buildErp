import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { specOutput } from "../../../Input-OutputEntities/EstimationEntities/specification";

export interface IFindmaterialSumUseCase {
   execute(materials:{ material_id: string, quantity: number }[]):Promise<specOutput | commonOutput>
}