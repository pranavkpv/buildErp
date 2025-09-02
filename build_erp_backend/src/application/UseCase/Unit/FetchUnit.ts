import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { unitSuccessMessage } from '../../../Shared/Messages/Unit.Message';
import { IFetchUnitUseCase } from '../../IUseCases/IUnit/IFetchUnit';
import { IUnitRepository } from '../../../domain/Entities/IRepository/IUnit';
import { commonOutput } from '../../dto/common';
import { idUnitnameDTO } from '../../dto/unit.dto';
import { IUnitMapper } from '../../../domain/IMappers/IUnit.mapper';

export class FetchUnitUseCase implements IFetchUnitUseCase {
    constructor(
      private _unitRepository: IUnitRepository,
      private _unitmapper: IUnitMapper,
    ) { }
    async execute(): Promise<commonOutput<idUnitnameDTO[]>> {
        const result = await this._unitRepository.getAllUnits();
        const mappedData = this._unitmapper.toUnitIdnameDTO(result);
        return ResponseHelper.success(unitSuccessMessage.FETCH, mappedData);
    }
}