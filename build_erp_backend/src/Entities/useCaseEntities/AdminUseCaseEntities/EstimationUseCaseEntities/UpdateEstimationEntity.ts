import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { rowData } from "../../../Input-OutputEntities/EstimationEntities/estimation";

export interface IUpdateEstimationUseCase{
   execute(input: { projectId: string, row: rowData[] }):Promise<commonOutput>
}