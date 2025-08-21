import { listingInput } from "../../../application/entities/common.entity";
import { addMaterialInput, editMaterialFullDatafetch, editMaterialInput, fetchUnitRateInput, findMaterialBynameCatBrandInput, findMaterialBynameCatBrandInputEdit, materialSumInput } from "../../../application/entities/material.entity";
import { IMaterialModelEntity } from "../../Entities/modelEntities/material.entity";
import { IProjectModelEntity } from "../../Entities/modelEntities/project.entity";



export interface IMaterialRepository {
   findSumOfMaterial(input:materialSumInput[]): Promise<number>
   findAllMaterial(input: listingInput):Promise<{data:editMaterialFullDatafetch[],totalPage:number}>;
   findMaterialById(_id: string): Promise<editMaterialFullDatafetch | null>
   findAllProject(): Promise<IProjectModelEntity[] | []>;
   findMaterailWithNameCategoryBrand(input: findMaterialBynameCatBrandInput): Promise<IMaterialModelEntity | null>;
   saveMaterial(input:  Omit<addMaterialInput, "projectWiseStock">): Promise<IMaterialModelEntity>;
   findMaterialInEdit(input: findMaterialBynameCatBrandInputEdit): Promise<IMaterialModelEntity | null>;
   updateMaterialById(input: Omit<editMaterialInput, "projectWiseStock">): Promise<void>;
   deleteMaterialById(_id: string): Promise<void>;
   findMaterialByBrandId(brand_id: string): Promise<IMaterialModelEntity | null>;
   findMaterialByCategoryId(category_id: string): Promise<IMaterialModelEntity | null>;
   findMaterialByUnitId(unit_id: string): Promise<IMaterialModelEntity | null>;
   findAllUniqueMaterial(): Promise<string[]>
   findUnitByMaterialName(material_name: string): Promise<string[]>
   findBrandByMaterialName(material_name: string): Promise<string[]>
   findUnitRate(input:fetchUnitRateInput): Promise<IMaterialModelEntity | null>
}