export interface addProjectInterface {
   project_name: string,
   type: string
   floor: number
   cost: number
   address: string,
   area: number,
   description: string,
   latitude: number,
   longitude: number
}

interface Location {
   lat: number;
   lng: number;
   name: string;
}

export interface ProjectType {
   _id: string;
   project_name: string;
   address: string;
   mobile_number: string;
   email: string;
   description: string;
   area: number;
   lat: number;
   long: number;
   cost: number;
   floor: number;
   project_type:string;
   userDetails: {
      _id: string;
      username: string;
      email?: string;
      phone?: number;
   };
   status: string;
};


export interface datakeyInterface {
   project_name: string,
   userDetails: {
      username: string
   },
   status: string
}

export interface editProjectInterface {
   _id: string, project_name: string,type:string, user_id: string,
   address: string, mobile_number: number, email: string,
   area: number, description: string, latitude: number, longitude: number,
   cost: number,floor: number,
}






