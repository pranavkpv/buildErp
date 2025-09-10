import { IBrandModelEntity } from '../../domain/Entities/modelEntities/brand.entity';
import { ICategoryModelEntity } from '../../domain/Entities/modelEntities/category.entity';
import { IMaterialModelEntity } from '../../domain/Entities/modelEntities/material.entity';
import { IUnitModelEntity } from '../../domain/Entities/modelEntities/unit.entity';
import { idBrandnameDTO } from '../dto/brand.dto';
import { idCategorynameDTO } from '../dto/category.dto';
import { fetchProjectIdnameDTO } from '../dto/project.dto';
import { idUnitnameDTO } from '../dto/unit.dto';

export interface materialSumInput {
   material_id: string,
   quantity: number
}

export interface addMaterialFetch {
   categoryData: idCategorynameDTO[]
   brandData: idBrandnameDTO[]
   unitData: idUnitnameDTO[]
   projectData: fetchProjectIdnameDTO[]
}

type projectStock = {
   project: string;
   stock: number;
}

export interface addMaterialInput {
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   projectWiseStock: projectStock[]
}

export interface findMaterialBynameCatBrandInput {
   material_name: string
   category_id: string,
   brand_id: string
}

export interface findMaterialBynameCatBrandInputEdit extends findMaterialBynameCatBrandInput {
   _id: string
}

export interface addProjectStockInput {
   project_id: string
   material_id: string
   stock: number
}

type projectStockIneditMat = {
   _id: string
   project_id: string
   stock: number
}

export interface editMaterialFetch extends addMaterialFetch {
   materialData: editMaterialFullDatafetch | null
   projectStockData: projectStockIneditMat[]
}


export interface editMaterialFullDatafetch extends IMaterialModelEntity {
   categoryDetails: ICategoryModelEntity[],
   brandDetails: IBrandModelEntity[],
   unitDetails: IUnitModelEntity[]
}

export interface editMaterialInput extends addMaterialInput {
   _id: string
}

export interface fetchUnitRateInput {
   material_name: string
   brand_name: string
   unit_name: string
}

export interface materialswithAggregateBrand extends IMaterialModelEntity {
   brandDetails: IBrandModelEntity
}
