import { listingMaterialDTO } from "../../application/dto/material.dto";
import { IMaterialModelEntity } from "../Entities/modelEntities/material.entity";

export interface IMaterialMapper {
   tolistingMaterialDTO(material:IMaterialModelEntity[]):listingMaterialDTO[]
}