import { IBrandModelEntity } from "../../ModelEntities/Brand.Entity"

export interface Brand {
   _id: string,
   brand_name: string,
   createdAt: Date,
   updatedAt: Date
}


export interface addBrandInput {
   brand_name: string
}

export interface editBrandInput {
   _id: string,
   brand_name: string
}


export interface brandOutput  {
   success?: boolean
   message?: string
   status_code?:number
   data: IBrandModelEntity[]
   totalPage?: number
}






