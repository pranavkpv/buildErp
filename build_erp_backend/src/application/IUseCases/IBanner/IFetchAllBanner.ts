import { listBannerDTO } from '../../dto/banner.dto';
import { commonOutput } from '../../dto/common';

export interface IFetchAllBannerUseCase {
   execute(): Promise<commonOutput<listBannerDTO[]> | commonOutput>
}