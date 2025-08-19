import { IEstimationModelEntity } from "../../domain/Entities/modelEntities/estimation.entity";
import { IProjectModelEntity } from "../../domain/Entities/modelEntities/project.entity";
import { ISpecModelEntity } from "../../domain/Entities/modelEntities/spec.entity";

export interface estiomationAggregateByspec extends IEstimationModelEntity {
   specDetails: ISpecModelEntity
}

export interface saveEstimationInput {
   spec_id: string
   spec_name: string,
   unitrate: number,
   quantity: number,
   total: number
}

interface budgetCost {
   _id:string
   projectObjectId:string
   budgeted_cost:number
}

export interface estiomationAggregatebyProject extends budgetCost {
   projectDetails:IProjectModelEntity
}