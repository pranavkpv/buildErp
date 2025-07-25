import { User } from "../UserEntities/user"


export interface Project {
   _id: string
   project_name: string
   user_id: string
   address:string
   mobile_number:number
   email:string
   description: string
   area:number
   status: string[] 
   sitemanager_id: string
   start_date : Date
   end_date : Date
   budgeted_cost ?: number 
   expected_image: string
   finalImage: string
   createdAt:Date
   updatedAt:Date
   userDetails ?: User[]
}

// input of add project
export interface addProjectInput {
   project_name: string,
   user_id: string,
   address: string,
   mobile_number: number,
   email: string,
   area: string,
   description: string
}


//input of edit project
export interface editProjectInput {
   _id: string
   project_name: string,
   user_id: string,
   address: string,
   mobile_number: number,
   email: string,
   area: number,
   description: string
}






//status change input
export interface statusChangeInput {
   _id: string,
   status: string
}





