import { commonOutput } from '../../dto/common';
import { addBannerInput } from '../../Entities/banner.entity';

export interface IAddBannerUsecase {
   execute(input:addBannerInput):Promise<commonOutput>
}