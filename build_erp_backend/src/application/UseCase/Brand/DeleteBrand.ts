import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { IDeleteBrandUsecase } from '../../IUseCases/IBrand/IDeleteBrand';
import { commonOutput } from '../../dto/common';
import { IBrandRepository } from '../../../domain/Entities/IRepository/IBrand';
import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { BrandFailedMessage, BrandSuccessMessage } from '../../../Shared/Messages/Brand.Message';

export class DeleteBrandUseCase implements IDeleteBrandUsecase {
    constructor(
    private _brandRepository: IBrandRepository,
    private _materialRepository: IMaterialRepository,
    ) { }
    async execute(id: string):
    Promise<commonOutput> {
        const existBrand = await this._materialRepository.getMaterialByBrandId(id);
        if (existBrand) {
            return ResponseHelper.conflictData(BrandFailedMessage.ALREADY_USED);
        }
        await this._brandRepository.deleteBrand(id);
        return ResponseHelper.success(BrandSuccessMessage.DELETE);
    }
}
