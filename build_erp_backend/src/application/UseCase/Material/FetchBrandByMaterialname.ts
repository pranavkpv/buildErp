import { IFetchBrandByMaterialNameUsecase } from '../../IUseCases/IMaterial/IFetchBrandByMaterialname';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { MaterialSuccessMessage } from '../../../Shared/Messages/Material.Message';
import { commonOutput } from '../../dto/common';
import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';

export class FetchBrandByMaterialNameUsecase implements IFetchBrandByMaterialNameUsecase {
    constructor(
      private _materialRepository: IMaterialRepository,
    ) { }
    async execute(materialName: string): Promise<commonOutput<string[]>> {
        const result = await this._materialRepository.getBrandsByMaterialName(materialName);
        return ResponseHelper.success(MaterialSuccessMessage.FETCH_BRAND_BY_MATERIAL_NAME, result);
    }
}