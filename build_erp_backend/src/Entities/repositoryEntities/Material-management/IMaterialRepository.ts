import { getMaterialEditData, materialOutput } from "../../Input-OutputEntities/MaterialEntities/material";
import { IMaterialModelEntity } from "../../ModelEntities/Material.Entity";
import { IProjectModelEntity } from "../../ModelEntities/ProjectEntity";



export interface IMaterialRepository{
   findAllMaterial(page:number,search:string):Promise<materialOutput>;
   findMaterialById(_id:string):Promise<getMaterialEditData | null>
   findAllProject():Promise<IProjectModelEntity[] | []>;
   findMaterailWithNameCategoryBrand(material_name:string,category_id:string,brand_id:string):Promise<IMaterialModelEntity | null>;
   saveMaterial(material_name:string,category_id:string,brand_id:string,unit_id:string,unit_rate:number,stock:number):Promise<IMaterialModelEntity>;
   findMaterialInEdit(_id:string,material_name:string,brand_id:string,category_id:string):Promise<IMaterialModelEntity | null>;
   updateMaterialById(_id:string,material_name:string,category_id:string,brand_id:string,unit_id:string,unit_rate:number,stock:number):Promise<void>;
   deleteMaterialById(_id:string):Promise<void>;
   findMaterialByBrandId(brand_id:string):Promise<IMaterialModelEntity | null>;
   findMaterialByCategoryId(category_id:string):Promise<IMaterialModelEntity | null>;
   findMaterialByUnitId(unit_id:string):Promise<IMaterialModelEntity | null>;
   findAllUniqueMaterial():Promise<string[]>
   findUnitByMaterialName(material_name:string):Promise<string[]>
   findBrandByMaterialName(material_name:string):Promise<string[]>
   findUnitRate(material_name:string,brand_name:string,unit_name:string):Promise<IMaterialModelEntity | null>
   findSumOfMaterial(materials:{ material_id: string, quantity: number }[]):Promise<number>
}