import { ISpecRepository } from '../../../domain/Entities/IRepository/ISpecification';
import { SpecFailedMessage, SpecSuccessMessage } from '../../../Shared/Messages/Specification.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { InputSpecification } from '../../Entities/spec.entity';
import { ISaveSpecUseCase } from '../../IUseCases/ISpecification/ISpecificationSave';


export class SaveSpecUseCase implements ISaveSpecUseCase {
    constructor(
        private _specRepository: ISpecRepository,
    ) { }
    async execute(input: InputSpecification): Promise<commonOutput> {
        const { specId, specname, specUnit, specDescription,
            materialDetails, labourDetails, additionalExpensePer, profitPer } = input;
        const existSpec = await this._specRepository.getSpecByName(specname);
        const existSpecId = await this._specRepository.getSpecBySpecId(specId);
        if (existSpec) {
            return ResponseHelper.conflictData(SpecFailedMessage.EXIST_NAME);
        }
        if (existSpecId) {
            return ResponseHelper.conflictData(SpecFailedMessage.EXIST_ID);
        }

        await this._specRepository.createSpec({
            specId, specname, specUnit, specDescription,
            materialDetails, labourDetails, additionalExpensePer, profitPer,
        });
        return ResponseHelper.createdSuccess(SpecSuccessMessage.ADD);
    }
}