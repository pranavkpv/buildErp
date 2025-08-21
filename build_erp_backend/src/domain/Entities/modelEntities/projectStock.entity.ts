export interface IProjectStockModelEntity{
   _id:string
   project_id:string
   material_id?:string
   stock:number
   createdAt: Date
   updatedAt: Date
}