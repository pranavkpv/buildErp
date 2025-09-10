import { listingInput } from '../../../application/Entities/common.entity';
import { addMaterialInput, editMaterialFullDatafetch, editMaterialInput, fetchUnitRateInput, findMaterialBynameCatBrandInput, findMaterialBynameCatBrandInputEdit, materialSumInput, materialswithAggregateBrand } from '../../../application/Entities/material.entity';
import { IMaterialModelEntity } from '../modelEntities/material.entity';
import { IProjectModelEntity } from '../modelEntities/project.entity';



export interface IMaterialRepository {

   calculateTotalMaterialCost(input: materialSumInput[]):
      Promise<number>

   getPaginatedMaterials(input: listingInput):
      Promise<{ data: editMaterialFullDatafetch[], totalPage: number }>;

   getAllProjects():
      Promise<IProjectModelEntity[] | []>;

   getMaterialById(id: string):
      Promise<editMaterialFullDatafetch | null>

   getMaterialByNameCategoryBrand(input: findMaterialBynameCatBrandInput):
      Promise<IMaterialModelEntity | null>;

   createMaterial(input: Omit<addMaterialInput, 'projectWiseStock'>):
      Promise<IMaterialModelEntity>;

   checkDuplicateMaterialOnEdit(input: findMaterialBynameCatBrandInputEdit):
      Promise<IMaterialModelEntity | null>;

   updateMaterial(input: Omit<editMaterialInput, 'projectWiseStock'>):
      Promise<void>;

   deleteMaterial(id: string):
      Promise<void>;

   getMaterialByBrandId(brandId: string):
      Promise<IMaterialModelEntity | null>;

   getMaterialByCategoryId(categoryId: string):
      Promise<IMaterialModelEntity | null>;

   getMaterialByUnitId(unitId: string):
      Promise<IMaterialModelEntity | null>;

   getAllUniqueMaterialNames():
      Promise<string[]>;

   getUnitsByMaterialName(materialName: string):
      Promise<string[]>;

   getBrandsByMaterialName(materialName: string):
      Promise<string[]>;

   getUnitRate(input: fetchUnitRateInput):
      Promise<IMaterialModelEntity | null>;

   getAllMaterialByIdswithAggregateBrand(materialnames: string[]):
      Promise<materialswithAggregateBrand[]>

   getMaterialByIds(materialIds: string[]):
      Promise<IMaterialModelEntity[]>

   getMaterialBynameAndBrand(material_name: string, brand_id: string):
      Promise<IMaterialModelEntity | null>

}