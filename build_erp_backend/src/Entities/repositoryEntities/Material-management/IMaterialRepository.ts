import { listingInput } from "../../../DTO/CommonEntities/common";
import { addMaterialInput, findMaterialBynameCatBrandInput, getMaterialEditData, materialOutput, unitRateInput } from "../../../DTO/MaterialEntities/material";
import { IMaterialModelEntity } from "../../ModelEntities/Material.Entity";
import { IProjectModelEntity } from "../../ModelEntities/ProjectEntity";



export interface IMaterialRepositoryEntity {
   findAllMaterial(input: listingInput): Promise<materialOutput>;
   findMaterialById(_id: string): Promise<getMaterialEditData | null>
   findAllProject(): Promise<IProjectModelEntity[] | []>;
   findMaterailWithNameCategoryBrand(input: findMaterialBynameCatBrandInput): Promise<IMaterialModelEntity | null>;
   saveMaterial(input: addMaterialInput): Promise<IMaterialModelEntity>;
   findMaterialInEdit(input: findMaterialBynameCatBrandInput): Promise<IMaterialModelEntity | null>;
   updateMaterialById(input: addMaterialInput): Promise<void>;
   deleteMaterialById(_id: string): Promise<void>;
   findMaterialByBrandId(brand_id: string): Promise<IMaterialModelEntity | null>;
   findMaterialByCategoryId(category_id: string): Promise<IMaterialModelEntity | null>;
   findMaterialByUnitId(unit_id: string): Promise<IMaterialModelEntity | null>;
   findAllUniqueMaterial(): Promise<string[]>
   findUnitByMaterialName(material_name: string): Promise<string[]>
   findBrandByMaterialName(material_name: string): Promise<string[]>
   findUnitRate(input: unitRateInput): Promise<IMaterialModelEntity | null>
   findSumOfMaterial(materials: { material_id: string, quantity: number }[]): Promise<number>
}