import { estiomationAggregatebyProject, estiomationAggregateByspec, saveEstimationInput } from "../../../application/entities/estimation.entity";
import { IEstimationModelEntity } from "../../Entities/modelEntities/estimation.entity";
import { IEstimationLabourModelEntity } from "../../Entities/modelEntities/estimationLabour.entity";
import { IEstimationMaterialModelEntity } from "../../Entities/modelEntities/estimationMaterial.entity";

export interface IEstimationRepository {
   AggregateEstimationBySpec(_id:string):Promise<estiomationAggregateByspec[]>
   saveEstimation(specDetails:saveEstimationInput[],projectId:string):Promise<void>
   displaySpec(search: string, page: number): Promise<{data:estiomationAggregatebyProject[],totalPage:number}>
   deleteEstimationById(_id:string):Promise<void>
   findEstimationByProjectId(projectId:string):Promise<IEstimationModelEntity[] | []>
   findEstimationBySpecId(_id:string):Promise<IEstimationModelEntity | null>
   findAllEstimationMaterial():Promise<IEstimationMaterialModelEntity[]>
   findAllEstimationLabour():Promise<IEstimationLabourModelEntity[]>
}

