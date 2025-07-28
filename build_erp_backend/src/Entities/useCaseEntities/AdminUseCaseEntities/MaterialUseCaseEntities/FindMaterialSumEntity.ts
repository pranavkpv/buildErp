import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IFindmaterialSumUseCase {
   execute(materials:{ material_id: string, quantity: number }[]):Promise<number | commonOutput>
}