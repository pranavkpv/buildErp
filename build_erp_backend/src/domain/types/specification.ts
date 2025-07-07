import { Unit } from "./unit"

export interface materialDetails{
  material_id:string
  quantity:number
}

export interface labourDetails{
   labour_id:string
   numberoflabour:number
}

export interface Specification{
   _id:string
   specId:string,
   specname:string,
   specUnit:string,
   specDescription:string,
   materialDetails:materialDetails[],
   labourDetails:labourDetails[],
   additionalExpense_per:number,
   profit_per:number
}

export interface outputSpec{
   success:boolean,
   message:string
}

export interface mixMatAndLabour{
   materialDetails: materialDetails[]
   labourDetails:labourDetails[]
}

export interface aggregateSpec{
   _id:string
   specId:string,
   specname:string,
   unitDetails:Unit,
   specDescription:string,
   materialDetails:materialDetails[],
   labourDetails:labourDetails[],
   additionalExpensePer:number,
   profitPer:number
}
