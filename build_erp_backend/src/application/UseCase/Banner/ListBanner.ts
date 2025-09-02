import { IBannerRepository } from "../../../domain/Entities/IRepository/IBanner";
import { IBannerMapper } from "../../../domain/IMappers/IBanner.mapper";
import { bannerSuccessMessage } from "../../../Shared/Messages/Banner.message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { listBannerDTO } from "../../dto/banner.dto";
import { commonOutput } from "../../dto/common";
import { listingInput } from "../../Entities/common.entity";
import { IListBannerUseCase } from "../../IUseCases/IBanner/IListBanner";

export class ListBannerUseCase implements IListBannerUseCase {
   constructor(
      private _bannerRepository: IBannerRepository,
      private _bannermapper: IBannerMapper
   ) { }
   async execute(input: listingInput):
      Promise<commonOutput<{ data: listBannerDTO[]; totalPage: number; }> | void> {
      const { data, totalPage } = await this._bannerRepository.listBannerBysearchandPage(input)
      const mappedData = this._bannermapper.toListbannerDTO(data)
      return ResponseHelper.success(bannerSuccessMessage.FETCH, { data: mappedData, totalPage })
   }
}