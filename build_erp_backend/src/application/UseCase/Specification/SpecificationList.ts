import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { SpecSuccessMessage } from '../../../Shared/Messages/Specification.Message';
import { ISpeclistUseCase } from '../../IUseCases/ISpecification/ISpecificationList';
import { ISpecRepository } from '../../../domain/Entities/IRepository/ISpecification';
import { commonOutput } from '../../dto/common';
import { listingInput } from '../../Entities/common.entity';
import { listSpec } from '../../Entities/spec.entity';


export class SpeclistUseCase implements ISpeclistUseCase {
    constructor( 
      private _specRepository: ISpecRepository,
    ) { }
    async execute(input:listingInput): Promise<commonOutput<{data:listSpec[],totalPage:number}> | commonOutput> {
        const { result,totalPage } = await this._specRepository.getAllSpecs(input);
        return ResponseHelper.success(SpecSuccessMessage.FETCH,{ data:result,totalPage });
    }
}