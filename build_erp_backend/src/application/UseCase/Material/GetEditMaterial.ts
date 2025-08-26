import { IGetEditMaterialUseCase } from "../../IUseCases/IMaterial/IGetEditMaterial"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { MaterialFailedMessage, MaterialSuccessMessage } from "../../../Shared/Messages/Material.Message"
import { IMaterialRepository } from "../../../domain/Entities/IRepository/IMaterial"
import { IProjectStockRepository } from "../../../domain/Entities/IRepository/IProjectStock"
import { commonOutput } from "../../dto/common"
import { IMaterialMapper } from "../../../domain/mappers/IMaterial.mapper"
import { EditmaterialDetailsDTO, EditprojectDetailsDTO } from "../../dto/material.dto"




export class GetEditMaterialUseCase implements IGetEditMaterialUseCase {
   constructor(
      private _materialRepository: IMaterialRepository,
      private _projectStockRepository: IProjectStockRepository,
      private _materialmapper: IMaterialMapper
   ) { }

   async execute(_id: string):
      Promise<commonOutput<{ materialData: EditmaterialDetailsDTO, projectStockData: EditprojectDetailsDTO[] }> | commonOutput> {
      const material_id = _id
      const materialData = await this._materialRepository.getMaterialById(_id)
      if (!materialData) return ResponseHelper.conflictData(MaterialFailedMessage.EXIST)
      const projectStockData = await this._projectStockRepository.getProjectStockByMaterialId(material_id)
      if (!projectStockData) return ResponseHelper.conflictData(MaterialFailedMessage.EXIST)
      const mappedMaterialData = this._materialmapper.toEditMaterialDTO(materialData)
      const mapperStockData = this._materialmapper.toEditProjectStockDTO(projectStockData)
      return ResponseHelper.success(
         MaterialSuccessMessage.EDITFETCH,
         { materialData: mappedMaterialData, projectStockData: mapperStockData }
      );
   }
}


