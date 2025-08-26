import { EditmaterialDetailsDTO, EditprojectDetailsDTO, listingMaterialDTO } from "../../application/dto/material.dto";
import { editMaterialFullDatafetch } from "../../application/Entities/material.entity";
import { ProjectStockOutput } from "../../application/Entities/project.entity";
import { IMaterialModelEntity } from "../Entities/modelEntities/material.entity";

export interface IMaterialMapper {
   tolistingMaterialDTO(material:IMaterialModelEntity[]):listingMaterialDTO[]
   toEditMaterialDTO(material:editMaterialFullDatafetch):EditmaterialDetailsDTO
   toEditProjectStockDTO(project:ProjectStockOutput[]):EditprojectDetailsDTO[]
}