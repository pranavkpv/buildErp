import { IUpdateSpecUseCase } from '../../IUseCases/ISpecification/IUpdateSpecification';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { SpecFailedMessage, SpecSuccessMessage } from '../../../Shared/Messages/Specification.Message';
import { ISpecRepository } from '../../../domain/Entities/IRepository/ISpecification';
import { InputSpecification } from '../../Entities/spec.entity';
import { commonOutput } from '../../dto/common';

export class UpdateSpecUseCase implements IUpdateSpecUseCase {
    constructor(
      private _SpecRepository: ISpecRepository,
    ) { }
    async execute(input: InputSpecification): Promise<commonOutput> {
        const { _id, specId, specname, specUnit, specDescription,
            materialDetails, labourDetails, additionalExpensePer, profitPer } = input;
        if (!_id) return ResponseHelper.badRequest(SpecFailedMessage.SPEC_ID_MISS);
        const existSpecIDInEdit = await this._SpecRepository.getSpecDuplicateById(_id, specId);
        const existSpecNameInEdit = await this._SpecRepository.getSpecDuplicateByName(_id, specname);
        if (existSpecIDInEdit) {
            return ResponseHelper.conflictData(SpecFailedMessage.EXIST_ID);
        }
        if (existSpecNameInEdit) {
            return ResponseHelper.conflictData(SpecFailedMessage.EXIST_NAME);
        }
        await this._SpecRepository.updateSpec({
            _id, specId, specname, specUnit, specDescription,
            materialDetails, labourDetails, additionalExpensePer, profitPer,
        });
        return ResponseHelper.success(SpecSuccessMessage.UPDATE);
    }
}