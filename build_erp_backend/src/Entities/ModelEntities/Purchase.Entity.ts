interface materialData {
   material_id:string
   brand_id?:string
   unit_id?:string
   quantity:number
   unit_rate:number
}
export interface IPurchaseModelEntity {
   project_id:string
   invoice_number:string
   date:Date
   description:string
   approval_status?:boolean
   materialDetails:materialData[]
}