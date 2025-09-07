import { addBannerInput, editBannerInput } from '../../../application/Entities/banner.entity';
import { listingInput } from '../../../application/Entities/common.entity';
import { IBannerModelEntity } from '../modelEntities/banner.entity';

export interface IBannerRepository {

   saveBanner(input: addBannerInput):
      Promise<IBannerModelEntity>

   listBannerBysearchandPage(input: listingInput):
      Promise<{ data: IBannerModelEntity[]; totalPage: number }>

   updateBanner(input: editBannerInput):
      Promise<IBannerModelEntity | null>

   deleteBanner(id: string):
      Promise<void>

   getAllBanner():
      Promise<IBannerModelEntity[]>

   getBannerByTitle(title: string):
      Promise<IBannerModelEntity | null>

   getBannerIneditByname(id: string, title: string):
      Promise<IBannerModelEntity | null>
}