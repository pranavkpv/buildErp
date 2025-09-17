export interface IProjectModelEntity {
   _id: string
   project_name: string
   user_id: string
   address: string
   mobile_number: number
   email: string
   description: string
   area: number
   status: string
   project_type: string
   floor: number
   sitemanager_id?: string
   start_date: Date
   end_date: Date
   expected_image: {
      title: string
      image: string
   }[]
   finalImage: string
   budgeted_cost: number
   latitude: number
   longitude: number
   estimateBy: string
   estimateStatus: boolean
   createdAt: Date
   updatedAt: Date
}