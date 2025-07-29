import { IUnitModelEntity } from "../../ModelEntities/Unit.Entity"

export interface Unit{
   _id:string,
   unit_name: string,
   short_name: string,
   createdAt:Date,
   updatedAt:Date
}

//input of add unit
export interface addUnitInput {
   unit_name: string,
   short_name: string
}



//input of edit unit

export interface editUnitInput {
   _id: string,
   unit_name: string,
   short_name: string
}

export interface UnitOutput  {
   success?: boolean
   message?: string
   status_code?:number
   data: IUnitModelEntity[]
   totalPage?: number
}



