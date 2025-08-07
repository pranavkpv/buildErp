import {  rowData, SpecData } from "../../Input-OutputEntities/EstimationEntities/estimation";
import { IEstimationModelEntity } from "../../ModelEntities/Estimation.Entity";
import { IEstimationLabourModelEntity } from "../../ModelEntities/EstimationLabour.Entity";
import { IEstimationMaterialModelEntity } from "../../ModelEntities/EstimationMaterial.Entity";

export interface IEstimationRepository{
   saveEstimation(specDetails:rowData[],projectId:string):Promise<void>
   displaySpec(search: string, page: number): Promise<{data:SpecData[],totalPage:number}>
   deleteEstimationById(_id:string):Promise<void>
   findEstimationByProjectId(projectId:string):Promise<IEstimationModelEntity[] | []>
   findEstimationBySpecId(_id:string):Promise<IEstimationModelEntity | null>
   AggregateEstimationBySpec(_id:string):Promise<IEstimationModelEntity[]>
   findAllEstimationMaterial():Promise<IEstimationMaterialModelEntity[]>
   findAllEstimationLabour():Promise<IEstimationLabourModelEntity[]>
}

