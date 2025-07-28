import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFetchMaterialByMaterialName } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FetchMaterialByMaterialNameEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchMaterialByMaterialName implements IFetchMaterialByMaterialName {
   private materialRepository:IMaterialRepository
   constructor(materialRepository:IMaterialRepository){
      this.materialRepository = materialRepository
   }
   async execute(material_name:string):Promise<string[] | commonOutput>{
     try {
       const result = await this.materialRepository.findUnitByMaterialName(material_name)
      return result
     } catch (error:any) {
      return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
     }

   }
}