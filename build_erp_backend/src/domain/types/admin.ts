import { Tokens } from "./auth"

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
//output of admin login
export interface adminloginOutput{
   success:boolean,
   message:string,
   token ?:Tokens
}

//output of admin logout
export interface adminLogoutOutput{
   success:boolean,
   message:string
}

