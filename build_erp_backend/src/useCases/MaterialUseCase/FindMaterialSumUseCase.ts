import { commonOutput } from "../../DTO/CommonEntities/common";
import { specOutput } from "../../DTO/EstimationEntities/specification";
import { IMaterialRepositoryEntity } from "../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFindmaterialSumUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialSumEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { MaterialSuccessMessage } from "../../Shared/Messages/Material.Message";


export class FindmaterialSumUseCase implements IFindmaterialSumUseCaseEntity {
   private materialRepository: IMaterialRepositoryEntity
   constructor(materialRepository: IMaterialRepositoryEntity) {
      this.materialRepository = materialRepository
   }
   async execute(materials: { material_id: string, quantity: number }[]): Promise<specOutput | commonOutput> {
      const sum = await this.materialRepository.findSumOfMaterial(materials)
      return ResponseHelper.success(MaterialSuccessMessage.FETCH_MATERIAL_SUM, sum)
   }
}