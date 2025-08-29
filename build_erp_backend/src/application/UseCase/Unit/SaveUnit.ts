import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { ISaveUnitUseCase } from '../../IUseCases/IUnit/ISaveUnit';
import { unitFailedMessage, unitSuccessMessage } from '../../../Shared/Messages/Unit.Message';
import { IUnitRepository } from '../../../domain/Entities/IRepository/IUnit';
import { saveUnitInput } from '../../Entities/unit.entity';
import { commonOutput } from '../../dto/common';


export class SaveUnitUseCase implements ISaveUnitUseCase {
    constructor(
      private _unitRepository: IUnitRepository,
    ) { }
    async execute(input: saveUnitInput): Promise<commonOutput> {
        const { unit_name, short_name } = input;
        const ExistUnit = await this._unitRepository.getUnitByName(unit_name);
        if (ExistUnit) {
            return ResponseHelper.conflictData(unitFailedMessage.EXIST);
        }
        const response = await this._unitRepository.createUnit({ unit_name, short_name });
        if (!response) throw new Error(unitFailedMessage.FAILED_SAVE);
        return ResponseHelper.success(unitSuccessMessage.ADD);
    }
}