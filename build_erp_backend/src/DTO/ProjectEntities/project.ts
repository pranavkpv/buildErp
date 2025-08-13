import { IProjectModelEntity } from "../../Entities/ModelEntities/ProjectEntity"
import { User } from "../UserEntities/user"


export interface Project {
   _id: string
   project_name: string
   user_id: string
   address: string
   mobile_number: number
   email: string
   description: string
   area: number
   status: string[]
   sitemanager_id: string
   start_date: Date
   end_date: Date
   budgeted_cost?: number
   expected_image: string
   finalImage: string
   createdAt: Date
   updatedAt: Date
   userDetails?: User[]
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
   latitude: number,
   longitude: number
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
   description: string,
   latitude: number,
   longitude: number
}






//status change input
export interface statusChangeInput {
   _id: string,
   status: string
}

export interface projectOutput {
   success?: boolean,
   message?: string,
   status_code?: number,
   data: IProjectModelEntity[] | IProjectModelEntity,
   totalPage?: number,
   areas?: number[]
}

export interface statusBaseProjectInput {
   status: string,
   search: string,
   area: number
   page: number
}

export interface costInput {
   projectId:string,
   startDate:string,
   endDate:string,
   cost:number
}

export interface addSitToProjectInput {
   _id:string,
   siteManager_id:string
}





