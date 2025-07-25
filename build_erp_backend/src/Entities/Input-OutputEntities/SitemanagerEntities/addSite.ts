
import { Sitemanager } from "./sitemanager";

export interface addSite{
   siteManager_id:string,
   selectedproject:[]
}

export interface projectWithSitemanager{
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
   expected_image: string
   finalImage: string
   createdAt:Date
   updatedAt:Date,
   sitemanagerDetails:Sitemanager[]
}

