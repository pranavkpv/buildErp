interface materialData {
   _id:string
   material_id:string
   material_name?:string
   brand_name?:string
   unit_name?:string
   quantity:number
   unit_rate:number
}
export interface IPurchaseModelEntity {
   _id:string
   project_id:string
   invoice_number:number
   date:Date
   description:string
   approval_status?:boolean
   materialDetails:materialData[]
   createdAt: Date
   updatedAt: Date
}