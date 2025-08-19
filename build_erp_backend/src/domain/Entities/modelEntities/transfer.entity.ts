export interface materialData {
   _id:string
   material_id:string
   material_name?:string
   brand_name?:string
   unit_name?:string
   quantity:number
   unit_rate:number
}
export interface ITransferModelEntity {
   _id:string
   from_project_id:string
   to_project_id:string
   transfer_id:string
   date:Date
   description:string
   approval_status?:boolean
   receive_status?:boolean
   materialDetails:materialData[]
   createdAt: Date
   updatedAt: Date
}