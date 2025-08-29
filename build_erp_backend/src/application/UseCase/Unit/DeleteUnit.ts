import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { unitFailedMessage, unitSuccessMessage } from '../../../Shared/Messages/Unit.Message';
import { IdeleteUnitUseCase } from '../../IUseCases/IUnit/IDeleteUnit';
import { IUnitRepository } from '../../../domain/Entities/IRepository/IUnit';
import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { commonOutput } from '../../dto/common';

export class DeleteUnitUseCase implements IdeleteUnitUseCase {
    constructor(
      private _unitRepository: IUnitRepository,
      private _materialRepository: IMaterialRepository,
    ) { }
    async execute(id: string): Promise<commonOutput> {
        const findUnit = await this._unitRepository.getUnitById(id);
        if (!findUnit) return ResponseHelper.badRequest(unitFailedMessage.NOT_EXIST);
        const existUnit = await this._materialRepository.getMaterialByUnitId(id);
        if (existUnit) return ResponseHelper.conflictData(unitFailedMessage.USED);
        const response = await this._unitRepository.deleteUnit(id);
        if (!response) throw new Error(unitFailedMessage.FAILED_DELETE);
        return ResponseHelper.success(unitSuccessMessage.DELETE);
    }
}