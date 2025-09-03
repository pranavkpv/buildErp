import { IBannerRepository } from '../../../domain/Entities/IRepository/IBanner';
import { bannerSuccessMessage } from '../../../Shared/Messages/Banner.message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IDeleteBannerUsecase } from '../../IUseCases/IBanner/IDeleteBanner';

export class DeleteBannerUseCase implements IDeleteBannerUsecase {
    constructor(
      private _bannerRepository: IBannerRepository,
    ) { }
    async execute(_id: string): Promise<commonOutput | void> {
        await this._bannerRepository.deleteBanner(_id);
        return ResponseHelper.success(bannerSuccessMessage.DELETE);
    }
}