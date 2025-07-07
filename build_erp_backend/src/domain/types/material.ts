import { Brand } from "./brand"
import { Category } from "./category"
import { editProjectStockData, editprostockData, Project } from "./project"
import { Unit } from "./unit"
import { addProjectStockInput } from "./project"

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
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   projectWiseStock: addProjectStockInput[]

}





//edit material data fetch
export interface getEditMaterialData {
   _id: string
}

export interface getMaterialEditData{
   _id: string,
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   createdAt: Date,
   updatedAt: Date,
   categoryDetails:Category[]
   brandDetails:Brand[],
   unitDetails:Unit[]
}

//output of data fetch in edit
export interface outEditMaterialData {
   categoryData: Category[],
   brandData : Brand[],
   unitData : Unit[] | null,
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
   projectStockData:editprostockData[]

}

//input of edit material
export interface editMaterialInput {
   _id:string,
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   projectWiseStock: editProjectStockData[]

}


//input of delete material
export interface deleteMaterialInput {
   _id: string
}


export interface outputMaterial {
   success: boolean,
   message: string
}

export interface MaterialUnique{
   material_name:string
}

export interface getAddMaterialData {
   categoryData: Category[],
   brandData: Brand[],
   unitData: Unit[] | null,
   projectData: Project[]
}

