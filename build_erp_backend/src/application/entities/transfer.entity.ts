import { IBrandModelEntity } from "../../domain/Entities/modelEntities/brand.entity";
import { IMaterialModelEntity } from "../../domain/Entities/modelEntities/material.entity";
import { IProjectStockModelEntity } from "../../domain/Entities/modelEntities/projectStock.entity";
import { IUnitModelEntity } from "../../domain/Entities/modelEntities/unit.entity";

type materials = {
   material_id: string;
   quantity: number;
   unit_rate: number;
};

export interface transferInput {
   _id: string
   from_project_id: string,
   to_project_id: string,
   transfer_id: string,
   date: string,
   description: string,
   materialDetails: materials[]
}

export interface listProjectStock extends IProjectStockModelEntity {
   materialDetails: IMaterialModelEntity
   brandDetails: IBrandModelEntity
   unitDetails: IUnitModelEntity
}