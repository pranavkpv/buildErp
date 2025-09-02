interface MaterialData{
   _id:string
   material_id:string
   quantity:number
}
interface LabourData{
   _id:string
   labour_id:string
   numberoflabour:number
}
export interface ISpecModelEntity{
   _id:string
   spec_id:string
   spec_name:string
   spec_unit:string
   description:string
   materialDetails:MaterialData[]
   labourDetails:LabourData[]
   additionalExpense_per:number
   profit_per:number
   blockStatus: boolean
   createdAt: Date
   updatedAt: Date
}