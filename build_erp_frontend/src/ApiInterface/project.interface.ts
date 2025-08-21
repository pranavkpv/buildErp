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
   _id:string
}