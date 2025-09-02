import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { IDisplayAllUnitUseCase } from '../../IUseCases/IUnit/IDisplayAllUnit';
import { unitSuccessMessage } from '../../../Shared/Messages/Unit.Message';
import { listingInput } from '../../Entities/common.entity';
import { IUnitRepository } from '../../../domain/Entities/IRepository/IUnit';
import { commonOutput } from '../../dto/common';
import { listUnitDTO } from '../../dto/unit.dto';
import { IUnitMapper } from '../../../domain/IMappers/IUnit.mapper';

export class DisplayAllUnitUseCase implements IDisplayAllUnitUseCase {
    constructor(
      private _unitRepository: IUnitRepository,
      private _unitmapper: IUnitMapper,
    ) { }
    async execute(input: listingInput):
      Promise<commonOutput<{ data: listUnitDTO[], totalPage: number }>> {
        const { data, totalPage } = await this._unitRepository.getPaginatedUnits(input);
        const mappedData = this._unitmapper.toListingUnitDTO(data);
        return ResponseHelper.success(unitSuccessMessage.FETCH, { data: mappedData, totalPage });
    }
}










