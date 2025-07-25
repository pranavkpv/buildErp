export interface IProjectModelEntity{
   project_name:string
   user_id:string
   address?:string
   mobile_number?:number
   email:string
   description?:string
   area?:number
   status:string
   sitemanager_id?:string
   start_date ?: string
   end_date ?: string
   expected_image ?: string
   finalImage ?: string
   budgeted_cost ?: number
}