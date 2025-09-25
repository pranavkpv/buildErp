import { listBannerDTO } from '../../dto/banner.dto';
import { commonOutput } from '../../dto/common';
import { listingInput } from '../../entities/common.entity';

export interface IListBannerUseCase {
   execute(input: listingInput):
      Promise<commonOutput<{ data: listBannerDTO[]; totalPage: number; }> | void>
}