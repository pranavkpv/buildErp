import { EstimationData, outPutEstimation, rowData, SpecData } from "../types/estimation";

export interface IEstimationRepository{
   saveEstimation(specDetails:rowData[],projectId:string):Promise<void>
   displaySpec(search: string, page: number): Promise<{data:SpecData[],totalPage:number}>
   deleteEstimationById(_id:string):Promise<void>
   findEstimationByProjectId(projectId:string):Promise<EstimationData[] | []>
   findEstimationBySpecId(_id:string):Promise<EstimationData | null>
   AggregateEstimationBySpec(_id:string):Promise<EstimationData[]>
}

