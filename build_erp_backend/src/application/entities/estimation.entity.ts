import { IBrandModelEntity } from '../../domain/Entities/modelEntities/brand.entity';
import { IEstimationModelEntity } from '../../domain/Entities/modelEntities/estimation.entity';
import { IEstimationLabourModelEntity } from '../../domain/Entities/modelEntities/estimationLabour.entity';
import { IEstimationMaterialModelEntity } from '../../domain/Entities/modelEntities/estimationMaterial.entity';
import { ILabourModelEntity } from '../../domain/Entities/modelEntities/labour.entity';
import { IMaterialModelEntity } from '../../domain/Entities/modelEntities/material.entity';
import { IProjectModelEntity } from '../../domain/Entities/modelEntities/project.entity';
import { ISpecModelEntity } from '../../domain/Entities/modelEntities/spec.entity';
import { IUnitModelEntity } from '../../domain/Entities/modelEntities/unit.entity';

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
   _id: string
   projectObjectId: string
   budgeted_cost: number
   reason:string
}

export interface estiomationAggregatebyProject extends budgetCost {
   projectDetails: IProjectModelEntity
}

export interface estimationAggregatebySpec extends IEstimationModelEntity {
   specDetails: ISpecModelEntity
}

export interface estimationAggregatebymaterialbrandunit extends IEstimationMaterialModelEntity {
   materialDetails: IMaterialModelEntity,
   brandDetails: IBrandModelEntity,
   unitDetails: IUnitModelEntity
}

export interface estimationAggregatebyLabour extends IEstimationLabourModelEntity {
   labourDetails: ILabourModelEntity
}

export interface rejectEstimationInput {
   reason:string 
   projectId:string
}

