export interface addProjectInterface {
   project_name: string,
   user_id: string,
   address: string,
   mobile_number: string,
   email: string,
   area: number,
   description: string,
   latitude: number,
   longitude: number
}

export interface editProjectInterface extends addProjectInterface {
   _id: string
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
  status:string
}
