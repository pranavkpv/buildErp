import { IMaterialModelEntity } from "../../../ModelEntities/Material.Entity";

export interface IFindMaterialByIdUsecase {
   execute(_id: string): Promise<IMaterialModelEntity | null>
}