interface MaterialData{
   material_id:string
   quantity:number
}
interface LabourData{
   labour_id:string
   numberoflabour:number
}
export interface ISpecModelEntity{
   _id:string
   spec_id:string
   spec_name:string
   spec_unit:string
   description?:string
   materialDetails:MaterialData[]
   labourDetails:LabourData[]
   additionalExpense_per:number
   profit_per:number
   createdAt: Date
   updatedAt: Date
}