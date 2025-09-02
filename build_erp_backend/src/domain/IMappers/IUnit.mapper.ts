import { idUnitnameDTO, listUnitDTO } from '../../application/dto/unit.dto';
import { IUnitModelEntity } from '../Entities/modelEntities/unit.entity';

export interface IUnitMapper {
   toUnitIdnameDTO(unit:IUnitModelEntity[]):idUnitnameDTO[]
   toListingUnitDTO(unit:IUnitModelEntity[]):listUnitDTO[]
}