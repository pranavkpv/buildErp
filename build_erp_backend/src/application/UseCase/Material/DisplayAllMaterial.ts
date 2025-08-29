import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { IMaterialMapper } from '../../../domain/mappers/IMaterial.mapper';
import { MaterialSuccessMessage } from '../../../Shared/Messages/Material.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { listingMaterialDTO } from '../../dto/material.dto';
import { listingInput } from '../../Entities/common.entity';
import { IDisplayAllMaterialUsecase } from '../../IUseCases/IMaterial/IDisplayAllMaterial';


export class DisplayAllMaterialUseCase implements IDisplayAllMaterialUsecase {
    constructor(
       private _materialRepository: IMaterialRepository,
       private _materialMapper: IMaterialMapper,
    ) { }
    async execute(input:listingInput): Promise<commonOutput<{data:listingMaterialDTO[],totalPage:number}> | commonOutput> {
        const { data, totalPage } = await this._materialRepository.getPaginatedMaterials(input);
        const mappedData = this._materialMapper.tolistingMaterialDTO(data);
        return ResponseHelper.success(MaterialSuccessMessage.FETCH, { data:mappedData, totalPage });
    }
}



