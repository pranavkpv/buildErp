import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { LabourFailedMessage, LabourSuccessMessage } from '../../../Shared/Messages/Labour.Message';
import { IUpdateLabourUseCase } from '../../IUseCases/ILabour/IUpdateLabour';
import { ILabourRepository } from '../../../domain/Entities/IRepository/ILabour';
import { labourEditInput } from '../../entities/labour.entity';
import { commonOutput } from '../../dto/common';



export class UpdateLabourUseCase implements IUpdateLabourUseCase {
    constructor(
      private _labourRepository: ILabourRepository,
    ) { }
    async execute(input: labourEditInput): Promise<commonOutput> {
        const { _id, labour_type, daily_wage } = input;
        const existLabour = await this._labourRepository.checkDuplicateLabourOnEdit(_id, labour_type);
        if (existLabour) {
            return ResponseHelper.conflictData(LabourFailedMessage.EXIST_LABOUR);
        }
        await this._labourRepository.updateLabour({ _id, labour_type, daily_wage });
        return ResponseHelper.success(LabourSuccessMessage.UPDATE);
    }
}