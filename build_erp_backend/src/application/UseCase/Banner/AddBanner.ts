import { IBannerRepository } from '../../../domain/Entities/IRepository/IBanner';
import { bannerFailedMessage, bannerSuccessMessage } from '../../../Shared/Messages/Banner.message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { addBannerInput } from '../../Entities/banner.entity';
import { IAddBannerUsecase } from '../../IUseCases/IBanner/IAddBanner';

export class AddBannerUseCase implements IAddBannerUsecase {
    constructor(
      private _bannerRepository: IBannerRepository,
    ) {

    }
    async execute(input: addBannerInput): Promise<commonOutput> {
        const response = await this._bannerRepository.saveBanner(input);
        if (response) {
            return ResponseHelper.success(bannerSuccessMessage.SAVE);
        } else {
            return ResponseHelper.conflictData(bannerFailedMessage.SAVE);
        }
    }
}