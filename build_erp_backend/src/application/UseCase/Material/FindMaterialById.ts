import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { IFindMaterialByIdUsecase } from '../../IUseCases/IMaterial/IFindMaterialById';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { MaterialSuccessMessage } from '../../../Shared/Messages/Material.Message';
import { commonOutput } from '../../dto/common';
import { editMaterialFullDatafetch } from '../../Entities/material.entity';

export class FindMaterialByIdUseCase implements IFindMaterialByIdUsecase {

    constructor(
      private _materialRepository: IMaterialRepository,
    ) { }
    async execute(id: string): Promise<commonOutput<editMaterialFullDatafetch | null>> {
        const materialList = await this._materialRepository.getMaterialById(id);
        return ResponseHelper.success(MaterialSuccessMessage.FETCH, materialList);
    }
}