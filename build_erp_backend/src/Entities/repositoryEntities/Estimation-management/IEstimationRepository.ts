import { listingInput } from "../../../DTO/CommonEntities/common";
import {  rowData, SpecData } from "../../../DTO/EstimationEntities/estimation";
import { IEstimationModelEntity } from "../../ModelEntities/Estimation.Entity";
import { IEstimationLabourModelEntity } from "../../ModelEntities/EstimationLabour.Entity";
import { IEstimationMaterialModelEntity } from "../../ModelEntities/EstimationMaterial.Entity";

export interface IEstimationRepositoryEntity{
   saveEstimation(specDetails:rowData[],projectId:string):Promise<void>
   displaySpec(input:listingInput): Promise<{data:SpecData[],totalPage:number}>
   deleteEstimationById(_id:string):Promise<void>
   findEstimationByProjectId(projectId:string):Promise<IEstimationModelEntity[] | []>
   findEstimationBySpecId(_id:string):Promise<IEstimationModelEntity | null>
   AggregateEstimationBySpec(_id:string):Promise<IEstimationModelEntity[]>
   findAllEstimationMaterial():Promise<IEstimationMaterialModelEntity[]>
   findAllEstimationLabour():Promise<IEstimationLabourModelEntity[]>
}

