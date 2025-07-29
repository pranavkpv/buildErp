import { ICategoryModelEntity } from "../../ModelEntities/Category.Entity"
import { commonOutput } from "../CommonEntities/common"

export interface Category {
   _id: string
   category_name: string,
   description: string,
   createdAt: Date,
   updatedAt: Date
}
//input of add category
export interface addcategoryInput {
   category_name: string,
   description: string
}

//input of edit category
export interface editCategoryInput {
   _id: string,
   category_name: string,
   description: string
}

export interface CategoryOutput  {
   success?: boolean
   message?: string
   status_code?:number
   data: ICategoryModelEntity[]
   totalPage?: number
}





