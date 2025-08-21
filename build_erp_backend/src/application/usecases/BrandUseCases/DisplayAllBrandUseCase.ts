import { IBrandRepository } from "../../../domain/interfaces/Material-management/IBrandRepository";
import { IBrandmapper } from "../../../domain/mappers/IBrand.mapper";
import { brandSuccessMessage } from "../../../Shared/Messages/Brand.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { idBrandnameDTO } from "../../dto/brand.dto";
import { commonOutput } from "../../dto/common";
import { listingInput } from "../../entities/common.entity";
import { IDisplayAllBrandUseCase } from "../../interfaces/useCase.Entity/Brand.UseCase.Entities/DisplayAllBrandEntity";

export class DisplayAllBrandUseCase implements IDisplayAllBrandUseCase {
   constructor(
      private _brandRepository: IBrandRepository,
      private _brandmapper: IBrandmapper
   ) { }
   async execute(input: listingInput): Promise<commonOutput<{ data: idBrandnameDTO[], totalPage: number }>> {
      const { data, totalPage } = await this._brandRepository.findAllListBrand(input)
      const mappedData = this._brandmapper.toidBrandnameDTO(data)
      return ResponseHelper.success(brandSuccessMessage.FETCH, { data: mappedData, totalPage })
   }
}

