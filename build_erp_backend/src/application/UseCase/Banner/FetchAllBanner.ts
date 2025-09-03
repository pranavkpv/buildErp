import { IBannerRepository } from '../../../domain/Entities/IRepository/IBanner';
import { IBannerMapper } from '../../../domain/IMappers/IBanner.mapper';
import { bannerSuccessMessage } from '../../../Shared/Messages/Banner.message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { listBannerDTO } from '../../dto/banner.dto';
import { commonOutput } from '../../dto/common';
import { IFetchAllBannerUseCase } from '../../IUseCases/IBanner/IFetchAllBanner';

export class FetchAllBannerUseCase implements IFetchAllBannerUseCase {
    constructor(
      private _bannerRepository: IBannerRepository,
      private _bannermapper: IBannerMapper,
    ) { }
    async execute(): Promise<commonOutput<listBannerDTO[]> | commonOutput> {
        const data = await this._bannerRepository.getAllBanner();
        const mappedData = this._bannermapper.toListbannerDTO(data);
        return ResponseHelper.success(bannerSuccessMessage.FETCH, mappedData);
    }
}