import { EditmaterialDetailsDTO, EditprojectDetailsDTO, listingMaterialDTO, stockDTO, unitRateDTO } from '../../application/dto/material.dto';
import { projectStockListDTO } from '../../application/dto/transfer.dto';
import { editMaterialFullDatafetch, stockDisplayAggregate } from '../../application/entities/material.entity';
import { ProjectStockOutput } from '../../application/entities/project.entity';
import { listProjectStock } from '../../application/entities/transfer.entity';
import { IMaterialModelEntity } from '../Entities/modelEntities/material.entity';

export interface IMaterialMapper {
   tolistingMaterialDTO(material:IMaterialModelEntity[]):listingMaterialDTO[]
   toEditMaterialDTO(material:editMaterialFullDatafetch):EditmaterialDetailsDTO
   toEditProjectStockDTO(project:ProjectStockOutput[]):EditprojectDetailsDTO[]
   toUniRateDTO(material:IMaterialModelEntity):unitRateDTO
   toStockDisplayDTO(material:stockDisplayAggregate[]):stockDTO[]
   toListStockDTO(stock:listProjectStock[]):projectStockListDTO[]
}