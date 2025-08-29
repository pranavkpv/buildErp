import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { LabourFailedMessage, LabourSuccessMessage } from '../../../Shared/Messages/Labour.Message';
import { IAddLabourUseCase } from '../../IUseCases/ILabour/IAddLabour';
import { ILabourRepository } from '../../../domain/Entities/IRepository/ILabour';
import { labourAddInput } from '../../Entities/labour.entity';
import { commonOutput } from '../../dto/common';


export class AddLabourUseCase implements IAddLabourUseCase {
    constructor( 
      private _labourRepository: ILabourRepository,
    ) { }
    async execute(input: labourAddInput): Promise<commonOutput> {
        const existLabourData = await this._labourRepository.getLabourByType(input.labour_type);
        if (existLabourData) {
            return ResponseHelper.conflictData(LabourFailedMessage.EXIST_LABOUR);
        }
        await this._labourRepository.createLabour(input);
        return ResponseHelper.createdSuccess(LabourSuccessMessage.ADD);
    }
}


