export interface Admin {
   _id: string
   username: string,
   password: string,
   createdAt:Date,
   updatedAt:Date
}

//input of admin login 
export interface adminloginInput {
   username: string,
   password: string
}




