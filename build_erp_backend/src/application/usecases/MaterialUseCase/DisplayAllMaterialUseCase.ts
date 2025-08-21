import { IMaterialRepository } from "../../../domain/interfaces/Material-management/IMaterialRepository";
import { IMaterialMapper } from "../../../domain/mappers/IMaterial.mapper";
import { MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { listingMaterialDTO } from "../../dto/material.dto";
import { listingInput } from "../../entities/common.entity";
import { IDisplayAllMaterialUsecase } from "../../interfaces/AdminUseCaseEntities/MaterialUseCaseEntities/DisplayAllMaterialEntity";


export class DisplayAllMaterialUseCase implements IDisplayAllMaterialUsecase {
   constructor(
       private _materialRepository: IMaterialRepository,
       private _materialMapper: IMaterialMapper
   ) { }
   async execute(input:listingInput): Promise<commonOutput<{data:listingMaterialDTO[],totalPage:number}> | commonOutput> {
      const { data, totalPage } = await this._materialRepository.findAllMaterial(input)
      const mappedData = this._materialMapper.tolistingMaterialDTO(data)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH, {data:mappedData, totalPage})
   }
}



