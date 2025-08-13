import { ISpecModelEntity } from "../../Entities/ModelEntities/Spec.Entity"
import { IUnitModelEntity } from "../../Entities/ModelEntities/Unit.Entity"



export interface materialDetails{
  material_id:string
  quantity:number
}

export interface labourDetails{
   labour_id:string
   numberoflabour:number
}

export interface InputSpecification{
   _id?:string
   specId:string,
   specname:string,
   specUnit:string,
   specDescription:string,
   materialDetails:materialDetails[],
   labourDetails:labourDetails[],
   additionalExpense_per:number,
   profit_per:number
}


export interface mixMatAndLabour{
   materialDetails: materialDetails[]
   labourDetails:labourDetails[]
}

export interface aggregateSpec{
   _id:string
   specId:string,
   specname:string,
   unitDetails:IUnitModelEntity[],
   specDescription:string,
   materialDetails:materialDetails[],
   labourDetails:labourDetails[],
   additionalExpensePer:number,
   profitPer:number
}

export interface specOutput {
   success?:boolean
   message?:string
   status_code?:number
   data:ISpecModelEntity | ISpecModelEntity[] | number | any[]
   totalPage?:number
}
