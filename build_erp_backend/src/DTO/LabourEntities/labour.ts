import { ILabourModelEntity } from "../../Entities/ModelEntities/Labour.Entity"

export interface Labour {
   _id: string,
   labour_type: string,
   daily_wage: number,
   createdAt: Date,
   updatedAt: Date
}


export interface inputLabour {
   _id?:string
   labour_type: string,
   daily_wage?: number
}



export interface labourOutput {
   success?:boolean
   message?:string
   status_code?:number
   data:ILabourModelEntity[] | ILabourModelEntity | null
   totalPage?:number
}



