import {  rowData, SpecData } from "../../Input-OutputEntities/EstimationEntities/estimation";
import { IEstimationModelEntity } from "../../ModelEntities/Estimation.Entity";

export interface IEstimationRepository{
   saveEstimation(specDetails:rowData[],projectId:string):Promise<void>
   displaySpec(search: string, page: number): Promise<{data:SpecData[],totalPage:number}>
   deleteEstimationById(_id:string):Promise<void>
   findEstimationByProjectId(projectId:string):Promise<IEstimationModelEntity[] | []>
   findEstimationBySpecId(_id:string):Promise<IEstimationModelEntity | null>
   AggregateEstimationBySpec(_id:string):Promise<IEstimationModelEntity[]>
}

