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
   estimateBy:string;
   estimateStatus:boolean
}

export interface userBasechatListDTO {
   _id: string;
   project_name: string;
   sitemanager_id: string;
   sitemanager_name: string;
   sitemanager_image?: string;
}

export interface fetchProjectIdnameDTO {
   _id: string
   project_name: string
}

export interface displayProjectDTO {
   _id: string;
   project_name: string;
   address: string;
   mobile_number: number;
   email: string;
   description: string;
   area: number;
   lat:number;
   long:number;
   userDetails: {
      _id: string;
      username: string;
      email?: string;
      phone?: number;
   };
   status: string;
}

export interface displayStatusCountDTO {
   number:number 
   label:string
}