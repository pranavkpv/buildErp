import { IBrandModelEntity } from "../../Entities/ModelEntities/Brand.Entity"
import { ICategoryModelEntity } from "../../Entities/ModelEntities/Category.Entity"
import { IMaterialModelEntity } from "../../Entities/ModelEntities/Material.Entity"
import { IProjectModelEntity } from "../../Entities/ModelEntities/ProjectEntity"
import { IUnitModelEntity } from "../../Entities/ModelEntities/Unit.Entity"
import { addProjectStockInput, editProjectStockData, editprostockData } from "../StockEntities/projectstock"



export interface Material {
   _id: string,
   material_name: string,
   categoryDetails: {
      _id: string,
      category_name: string,
      description: string,
      createdAt: Date,
      updatedAt: Date
   }
   brandDetails: {
      _id: string,
      brand_name: string,
      createdAt: Date,
      updatedAt: Date
   }
   unitDetails: {
      _id: string,
      unit_name: string,
      short_name: string,
      createdAt: Date,
      updatedAt: Date
   }
   unit_rate: number,
   stock: number,
   createdAt: Date,
   updatedAt: Date
}

export interface MaterialList {
   _id: string,
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   createdAt: Date,
   updatedAt: Date
}

export interface ProjectStock {
   _id: string
   project_id: string,
   material_id: string,
   stock: number
   createdAt: Date,
   updatedAt: Date
}


//input of add material
export interface addMaterialInput {
   _id?: string
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   projectWiseStock?: addProjectStockInput[]

}





//edit material data fetch
export interface getEditMaterialData {
   _id: string
}

export interface getMaterialEditData {
   _id: string,
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   createdAt: Date,
   updatedAt: Date,
   categoryDetails: ICategoryModelEntity[]
   brandDetails: IBrandModelEntity[],
   unitDetails: IUnitModelEntity[]
}

//output of data fetch in edit
export interface outEditMaterialData {
   categoryData: ICategoryModelEntity[],
   brandData: IBrandModelEntity[],
   unitData: IUnitModelEntity[] | null,
   materialData: {
      _id: string,
      material_name: string,
      category_id: string,
      brand_id: string,
      unit_id: string,
      unit_rate: number,
      stock: number,
      createdAt: Date,
      updatedAt: Date
   } | null,
   projectStockData: editprostockData[]
}

//input of edit material
export interface editMaterialInput {
   _id: string,
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   projectWiseStock: editProjectStockData[]

}





export interface MaterialUnique {
   material_name: string
}

export interface getAddMaterialData {
   categoryData: ICategoryModelEntity[],
   brandData: IBrandModelEntity[],
   unitData: IUnitModelEntity[] | null,
   projectData: IProjectModelEntity[]
}

export interface materialOutput {
   success?: boolean
   message?: string
   status_code?: number
   data: Material[] | getAddMaterialData | outEditMaterialData | string[] | IMaterialModelEntity | null
   totalPage?: number
}


export interface findMaterialBynameCatBrandInput {
   _id?: string
   material_name: string,
   category_id: string,
   brand_id: string
}

export interface unitRateInput {
   material_name: string,
   brand_name: string,
   unit_name: string
}

