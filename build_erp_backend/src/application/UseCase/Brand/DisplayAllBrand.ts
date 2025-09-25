import { IBrandRepository } from '../../../domain/Entities/IRepository/IBrand';
import { IBrandmapper } from '../../../domain/IMappers/IBrand.mapper';
import { BrandSuccessMessage } from '../../../Shared/Messages/Brand.Message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { idBrandnameDTO } from '../../dto/brand.dto';
import { commonOutput } from '../../dto/common';
import { listingInput } from '../../entities/common.entity';
import { IDisplayAllBrandUseCase } from '../../IUseCases/IBrand/IDisplayAllBrand';

export class DisplayAllBrandUseCase implements IDisplayAllBrandUseCase {
    constructor(
      private _brandRepository: IBrandRepository,
      private _brandmapper: IBrandmapper,
    ) { }
    async execute(input: listingInput):
      Promise<commonOutput<{ data: idBrandnameDTO[], totalPage: number }>> {
        const { data, totalPage } = await this._brandRepository.getBrandsWithPagination(input);
        const mappedData = this._brandmapper.toidBrandnameDTO(data);
        return ResponseHelper.success(BrandSuccessMessage.FETCH, { data: mappedData, totalPage });
    }
}

