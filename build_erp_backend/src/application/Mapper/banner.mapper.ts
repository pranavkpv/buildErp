import { IBannerModelEntity } from '../../domain/Entities/modelEntities/banner.entity';
import { IBannerMapper } from '../../domain/IMappers/IBanner.mapper';
import { listBannerDTO } from '../dto/banner.dto';

export class BannerMapper implements IBannerMapper {
    toListbannerDTO(banner: IBannerModelEntity[]): listBannerDTO[] {
        return banner.map((element) => (
            {
                _id: element._id,
                image: element.image,
                subtitle: element.subtitle,
                title: element.title,
            }
        ));
    }
}