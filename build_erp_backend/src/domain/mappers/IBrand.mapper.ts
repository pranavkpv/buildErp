import { idBrandnameDTO } from "../../application/dto/brand.dto";
import { IBrandModelEntity } from "../Entities/modelEntities/brand.entity";

export interface IBrandmapper {
   toidBrandnameDTO(brand:IBrandModelEntity[]):idBrandnameDTO[]
}