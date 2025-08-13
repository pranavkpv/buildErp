import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { specOutput } from "../../../../DTO/EstimationEntities/specification";

export interface IFindmaterialSumUseCaseEntity {
   execute(materials:{ material_id: string, quantity: number }[]):Promise<specOutput | commonOutput>
}