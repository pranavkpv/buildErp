import { Tokens } from "./auth"
import { Sitemanager } from "./sitemanager"
import { User } from "./user"

export interface Project {
   _id: string
   project_name: string
   user_id: string
   address:string
   mobile_number:number
   email:string
   description: string
   area:number
   status: string[]//"pending" | "processing" | "completed";
   sitemanager_id: string
   start_date : Date
   end_date : Date
   budgeted_cost ?: number 
   expected_image: string
   finalImage: string
   createdAt:Date
   updatedAt:Date
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



//delete project input
export interface deleteProjectInput {
   _id: string
}



//status change input
export interface statusChangeInput {
   _id: string,
   status: string
}

//status change output
export interface outputProject{
   success:boolean,
   message:string,
   token ?: Tokens
   existSitemanager ?:Sitemanager
}


export interface addProjectStockInput {
   project: string,
   material_id: string,
   stock: number
}

export interface editprostockData{
     _id:string
   project_id: string,
   material_id: string,
   stock: number,
   createdAt:Date,
   updatedAt:Date
}

export interface editProjectStockData{
   _id:string
   project: string,
   material_id: string,
   stock: number,
   createdAt:Date,
   updatedAt:Date
}

export interface getProjectListData{
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
   expected_image: string
   finalImage: string
   createdAt:Date
   updatedAt:Date
   userDetails:User[]
}
