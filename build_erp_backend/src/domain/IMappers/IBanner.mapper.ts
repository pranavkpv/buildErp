import { listBannerDTO } from '../../application/dto/banner.dto';
import { IBannerModelEntity } from '../Entities/modelEntities/banner.entity';

export interface IBannerMapper {
   toListbannerDTO(banner:IBannerModelEntity[]):listBannerDTO[]
}