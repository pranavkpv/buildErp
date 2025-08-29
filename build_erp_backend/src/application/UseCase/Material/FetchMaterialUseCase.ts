import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { MaterialSuccessMessage } from '../../../Shared/Messages/Material.Message';
import { IFetchMaterialUseCase } from '../../IUseCases/IMaterial/FetchMaterialEntity';
import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { commonOutput } from '../../dto/common';

export class FetchMaterialUseCase implements IFetchMaterialUseCase {
    constructor(
      private _materialRepository: IMaterialRepository,
    ) { }
    async execute(): Promise<commonOutput<string[]>> {
        const data = await this._materialRepository.getAllUniqueMaterialNames();
        return ResponseHelper.success(MaterialSuccessMessage.UNIQUE_MATERIAL_FETCH, data);
    }
}