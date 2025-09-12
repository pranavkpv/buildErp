import { IProjectModelEntity } from '../../domain/Entities/modelEntities/project.entity';
import { IProjectStockModelEntity } from '../../domain/Entities/modelEntities/projectStock.entity';
import { idBrandnameDTO } from './brand.dto';
import { idCategorynameDTO } from './category.dto';
import { idUnitnameDTO } from './unit.dto';

export interface ProjectStockOutputDTO extends IProjectStockModelEntity {
   projectDetails: IProjectModelEntity[]
}

export interface listingMaterialDTO {
   _id: string
   material_name: string
   unit_rate: number
   brandDetails: idBrandnameDTO[],
   unitDetails: idUnitnameDTO[],
   categoryDetails: idCategorynameDTO[]
}

export interface EditmaterialDetailsDTO {
   material_name: string
   category_id: string
   brand_id: string
   unit_id: string
   unit_rate: number
   stock: number
}

export interface EditprojectDetailsDTO {
   project: string
   stock: number
   _id: string
}

export interface unitRateDTO {
   material_id: string
   unit_rate: number
}

export interface stockDTO {
   _id: string
   material_name: string
   brand_name: string
   unit_name: string
   stock: number
}

