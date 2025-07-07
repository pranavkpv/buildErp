import { EstimationData, outPutEstimation, rowData, SpecData } from "../types/estimation";

export interface IEstimationRepository{
   saveEstimation(specDetails:rowData[],projectId:string):Promise<void>
   displaySpec():Promise<SpecData[]>
   deleteEstimationById(_id:string):Promise<void>
   findEstimationByProjectId(projectId:string):Promise<EstimationData[] | []>
}

