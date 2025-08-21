import { labourDataDisplayDTO } from "../../application/dto/labour.dto";
import { ILabourModelEntity } from "../Entities/modelEntities/labour.entity";

export interface ILabourMapper {
   toDisplayLabourDTO(labour:ILabourModelEntity[]):labourDataDisplayDTO[]
   toFetchLabourDTO(labour:ILabourModelEntity):labourDataDisplayDTO
}