import { IProjectModelEntity } from "../../domain/Entities/modelEntities/project.entity";
import { IProjectStockModelEntity } from "../../domain/Entities/modelEntities/projectStock.entity";
import { idBrandnameDTO } from "./brand.dto";
import { idCategorynameDTO } from "./category.dto";
import { idUnitnameDTO } from "./unit.dto";

export interface ProjectStockOutputDTO extends IProjectStockModelEntity {
   projectDetails: IProjectModelEntity[]
}

export interface listingMaterialDTO {
   _id: string
   material_name: string
   unit_rate:number
   brandDetails: idBrandnameDTO[],
   unitDetails: idUnitnameDTO[],
   categoryDetails: idCategorynameDTO[]
}