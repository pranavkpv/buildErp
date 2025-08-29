import { IBrandRepository } from '../../../domain/Entities/IRepository/IBrand';
import { BrandFailedMessage, BrandSuccessMessage } from '../../../Shared/Messages/Brand.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { ISaveBrandUseCase } from '../../IUseCases/IBrand/ISaveBrand';


export class SaveBrandUseCase implements ISaveBrandUseCase {
    constructor(
      private _brandRepository: IBrandRepository,
    ) { }
    async execute(brandName: string):
      Promise<commonOutput> {
        const existBrandData = await this._brandRepository.getBrandByName(brandName);
        if (existBrandData) {
            return ResponseHelper.conflictData(BrandFailedMessage.ALREADY_EXIST);
        }
        await this._brandRepository.createBrand(brandName);
        return ResponseHelper.createdSuccess(BrandSuccessMessage.ADD);
    }
}
