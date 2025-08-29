import { IBrandRepository } from '../../../domain/Entities/IRepository/IBrand';
import { IUpdateBrandUseCase } from '../../IUseCases/IBrand/IUpdateBrand';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { BrandFailedMessage, BrandSuccessMessage } from '../../../Shared/Messages/Brand.Message';


export class UpdateBrandUseCase implements IUpdateBrandUseCase {
    constructor(
      private _brandRepository: IBrandRepository,
    ) { }
    async execute(id: string, brandName: string):
      Promise<commonOutput> {
        const existBrandData = await this._brandRepository.getBrandForEdit(id, brandName);
        if (existBrandData) {
            return ResponseHelper.conflictData(BrandFailedMessage.ALREADY_EXIST);
        }
        await this._brandRepository.updateBrand(id, brandName);
        return ResponseHelper.success(BrandSuccessMessage.UPDATE);
    }
}
