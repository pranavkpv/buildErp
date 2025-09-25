import { commonOutput } from '../../dto/common';
import { addBannerInput } from '../../entities/banner.entity';

export interface IAddBannerUsecase {
   execute(input:addBannerInput):Promise<commonOutput>
}