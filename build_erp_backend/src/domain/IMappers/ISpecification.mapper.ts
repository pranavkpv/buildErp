import { specFullDTO, userSpecDTO } from '../../application/dto/specification.dto';
import { ISpecModelEntity } from '../Entities/modelEntities/spec.entity';

export interface ISpecificationMapper {
   toFetchSitemanagerNameandId(spec: ISpecModelEntity[]): specFullDTO[]
   toUserSpecDto(spec: ISpecModelEntity[]): userSpecDTO[]
}