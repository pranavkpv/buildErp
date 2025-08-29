import { IBrandModelEntity } from '../../domain/Entities/modelEntities/brand.entity';
import { IBrandmapper } from '../../domain/mappers/IBrand.mapper';
import { idBrandnameDTO } from '../dto/brand.dto';

export class Brandmapper implements IBrandmapper {
    toidBrandnameDTO(brand: IBrandModelEntity[]): idBrandnameDTO[] {
        return brand.map((item)=>({
            _id:item._id,
            brand_name:item.brand_name,
        }));
    }
}