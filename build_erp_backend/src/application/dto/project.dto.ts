export interface publicProjectDTO {
   _id: string;
   project_name: string;
   expected_image: string;
   finalImage: string;
   area: number;
   address: string;
   status: string;
   description: string;
   latitude: number;
   longitude: number
}

export interface userBaseProjectDTO {
   _id: string;
   project_name: string;
   address: string;
   area: number;
   description: string;
   expected_image: string;
   budgeted_cost: number;
   status: string;
   start_date: Date;
   end_date: Date;
}

export interface userBasechatListDTO {
   _id: string;
   project_name: string;
   sitemanager_id: string;
   sitemanager_name: string;
   sitemanager_image?: string;
}

export interface fetchProjectIdnameDTO {
   _id:string 
   project_name:string
}