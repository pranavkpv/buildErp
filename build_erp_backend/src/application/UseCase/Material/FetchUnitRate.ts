import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { MaterialSuccessMessage } from '../../../Shared/Messages/Material.Message';
import { IFetchUnitRateUseCase } from '../../IUseCases/IMaterial/IFetchUnitRate';
import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { commonOutput } from '../../dto/common';
import { fetchUnitRateInput } from '../../Entities/material.entity';
import { IMaterialMapper } from '../../../domain/mappers/IMaterial.mapper';
import { unitRateDTO } from '../../dto/material.dto';


export class FetchUnitRateUseCase implements IFetchUnitRateUseCase {
    constructor(
      private _materialRepository: IMaterialRepository,
      private _materialmapper : IMaterialMapper,
    ) { }
    async execute(input:fetchUnitRateInput): Promise<commonOutput<unitRateDTO> | void> {
        const existMaterial = await this._materialRepository.getUnitRate(input);
        if (!existMaterial) return;
        const unitRateData = this._materialmapper.toUniRateDTO(existMaterial);
        return ResponseHelper.success(MaterialSuccessMessage.FETCHUNITRATE, unitRateData);
    }
}