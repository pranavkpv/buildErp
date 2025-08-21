import { IUnitModelEntity } from "../../domain/Entities/modelEntities/unit.entity";
import { IUnitMapper } from "../../domain/mappers/IUnit.mapper";
import { idUnitnameDTO, listUnitDTO } from "../dto/unit.dto";

export class unitMapper implements IUnitMapper {
   toUnitIdnameDTO(unit: IUnitModelEntity[]): idUnitnameDTO[] {
      return unit.map((item) => ({
         _id: item._id,
         unit_name: item.unit_name,
      }))
   }
   toListingUnitDTO(unit: IUnitModelEntity[]): listUnitDTO[] {
      return unit.map((item) => ({
         _id: item._id,
         unit_name: item.unit_name,
         short_name: item.short_name
      }))
   }
}