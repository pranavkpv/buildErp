import { IMaterialModelEntity } from "../../../Entities/ModelEntities/Material.Entity";
import { IMaterialRepository } from "../../../Entities/repositoryEntities/Material-management/IMaterialRepository";
import { IFindMaterialByIdUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/MaterialUseCaseEntities/FindMaterialByIdEntity";

export class FindMaterialByIdUseCase implements IFindMaterialByIdUsecase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(_id: string): Promise<IMaterialModelEntity | null> {
      const materialList = await this.materialRepository.findMaterialById(_id)
      return materialList ? materialList : null
   }
}