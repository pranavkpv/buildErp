import { ISpecRepository } from '../../../domain/Entities/IRepository/ISpecification';
import { ISpecificationMapper } from '../../../domain/IMappers/ISpecification.mapper';
import { SpecSuccessMessage } from '../../../Shared/Messages/Specification.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { userSpecDTO } from '../../dto/specification.dto';
import { IGetSpecIdnameUseCase } from '../../IUseCases/ISpecification/IGetSpecIdname';

export class GetSpecIdnameUseCase implements IGetSpecIdnameUseCase {
    constructor(
      private _specRepository: ISpecRepository,
      private _specMapper: ISpecificationMapper,
    ) { }
    async execute(): Promise<commonOutput<userSpecDTO[]>> {
        const specData = await this._specRepository.getAllSpecsList();
        const mappedData = this._specMapper.toUserSpecDto(specData);
        return ResponseHelper.success(SpecSuccessMessage.FETCH, mappedData);
    }
}