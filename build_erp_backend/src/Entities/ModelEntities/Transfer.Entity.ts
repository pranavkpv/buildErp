interface materialData {
   material_id:string
   material_name?:string
   brand_name?:string
   unit_name?:string
   quantity:number
   unit_rate:number
}
export interface ITransferModelEntity {
   from_project_id:string
   to_project_id:string
   transfer_id:string
   date:Date
   description:string
   approval_status?:boolean
   materialDetails:materialData[]
}