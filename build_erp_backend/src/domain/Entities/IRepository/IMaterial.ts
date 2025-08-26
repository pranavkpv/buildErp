import { listingInput } from "../../../application/Entities/common.entity";
import { addMaterialInput, editMaterialFullDatafetch, editMaterialInput, fetchUnitRateInput, findMaterialBynameCatBrandInput, findMaterialBynameCatBrandInputEdit, materialSumInput } from "../../../application/Entities/material.entity";
import { IMaterialModelEntity } from "../modelEntities/material.entity";
import { IProjectModelEntity } from "../modelEntities/project.entity";



export interface IMaterialRepository {

   calculateTotalMaterialCost(input: materialSumInput[]):
      Promise<number>

   getPaginatedMaterials(input: listingInput):
      Promise<{ data: editMaterialFullDatafetch[], totalPage: number }>;

   getAllProjects():
      Promise<IProjectModelEntity[] | []>;

   getMaterialById(_id: string):
      Promise<editMaterialFullDatafetch | null>

   getMaterialByNameCategoryBrand(input: findMaterialBynameCatBrandInput):
      Promise<IMaterialModelEntity | null>;

   createMaterial(input: Omit<addMaterialInput, "projectWiseStock">):
      Promise<IMaterialModelEntity>;

   checkDuplicateMaterialOnEdit(input: findMaterialBynameCatBrandInputEdit):
      Promise<IMaterialModelEntity | null>;

   updateMaterial(input: Omit<editMaterialInput, "projectWiseStock">):
      Promise<void>;

   deleteMaterial(_id: string):
      Promise<void>;

   getMaterialByBrandId(brand_id: string):
      Promise<IMaterialModelEntity | null>;

   getMaterialByCategoryId(category_id: string):
      Promise<IMaterialModelEntity | null>;

   getMaterialByUnitId(unit_id: string):
      Promise<IMaterialModelEntity | null>;

   getAllUniqueMaterialNames():
      Promise<string[]>;

   getUnitsByMaterialName(material_name: string):
      Promise<string[]>;

   getBrandsByMaterialName(material_name: string):
      Promise<string[]>;

   getUnitRate(input: fetchUnitRateInput):
      Promise<IMaterialModelEntity | null>;

}