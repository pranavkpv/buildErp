import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { LabourFailedMessage, LabourSuccessMessage } from '../../../Shared/Messages/Labour.Message';
import { IDeleteLabourUseCase } from '../../IUseCases/ILabour/IDeleteLabour';
import { ILabourRepository } from '../../../domain/Entities/IRepository/ILabour';
import { ISpecRepository } from '../../../domain/Entities/IRepository/ISpecification';
import { commonOutput } from '../../dto/common';


export class DeleteLabourUseCase implements IDeleteLabourUseCase {

    constructor(
      private _labourRepository: ILabourRepository,
      private _specRepository: ISpecRepository,
    ) { }
   
    async execute(id: string): Promise<commonOutput> {
        const existSpec = await this._specRepository.getSpecByLabourId(id);
        if (existSpec) {
            return ResponseHelper.conflictData(LabourFailedMessage.EXIST_SPEC);
        }
        await this._labourRepository.deleteLabourById(id);
        return ResponseHelper.success(LabourSuccessMessage.DELETE);
    }
}