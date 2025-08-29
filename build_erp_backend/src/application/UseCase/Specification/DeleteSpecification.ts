
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { SpecFailedMessage, SpecSuccessMessage } from '../../../Shared/Messages/Specification.Message';
import { IDeleteSpecUseCase } from '../../IUseCases/ISpecification/IDeleteSpecification';
import { ISpecRepository } from '../../../domain/Entities/IRepository/ISpecification';
import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { commonOutput } from '../../dto/common';

export class DeleteSpecUseCase implements IDeleteSpecUseCase {
    constructor(
      private _specRepository: ISpecRepository,
      private _estimationRepostory: IEstimationRepository,
    ) { }
    async execute(id: string): Promise<commonOutput> {
        const existEstimationBySpec = await this._estimationRepostory.getEstimationBySpecId(id);
        if (existEstimationBySpec) {
            return ResponseHelper.conflictData(SpecFailedMessage.USED_ESTIMATION);
        }
        await this._specRepository.deleteSpecById(id);
        return ResponseHelper.success(SpecSuccessMessage.DELETE);
    }
}