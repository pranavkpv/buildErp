import { ISpecRepository } from '../../../domain/Entities/IRepository/ISpecification';
import { IGetSpecUseCase } from '../../IUseCases/ISpecification/IGetSpecification';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { SpecSuccessMessage } from '../../../Shared/Messages/Specification.Message';
import { specFullDTO } from '../../dto/specification.dto';
import { commonOutput } from '../../dto/common';
import { ISpecificationMapper } from '../../../domain/IMappers/ISpecification.mapper';


export class GetSpecUseCase implements IGetSpecUseCase {
    constructor(
      private _specRepository: ISpecRepository,
      private _specificationMapper: ISpecificationMapper,
    ) { }
    async execute(): Promise<commonOutput<specFullDTO[]> | commonOutput> {
        const data = await this._specRepository.getAllSpecsList();
        const mappedData = this._specificationMapper.toFetchSitemanagerNameandId(data);
        return ResponseHelper.success(SpecSuccessMessage.FETCH, mappedData);
    }
}