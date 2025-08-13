import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { rowData } from "../../../../DTO/EstimationEntities/estimation";

export interface ISaveEstimationUseCaseEntity{
    execute(input: { projectId: string, row: rowData[] }):Promise<commonOutput> 
}