import { IBannerRepository } from '../../../domain/Entities/IRepository/IBanner';
import { bannerFailedMessage, bannerSuccessMessage } from '../../../Shared/Messages/Banner.message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { editBannerInput } from '../../entities/banner.entity';
import { IEditBannerUseCase } from '../../IUseCases/IBanner/IEditBanner';

export class EditBannerUseCase implements IEditBannerUseCase {
    constructor(
      private _bannerRepository: IBannerRepository,
    ) { }
    async execute(input: editBannerInput): Promise<commonOutput | void> {
        const existData = await this._bannerRepository.getBannerIneditByname(input._id,input.title);
        if (existData){
            return ResponseHelper.conflictData(bannerFailedMessage.ALREADY_EXIST);
        }
        const response = await this._bannerRepository.updateBanner(input);
        if (!response){
            return ResponseHelper.conflictData(bannerFailedMessage.UPDATE);
        } else {
            return ResponseHelper.success(bannerSuccessMessage.UPDATE);
        }
    }
}