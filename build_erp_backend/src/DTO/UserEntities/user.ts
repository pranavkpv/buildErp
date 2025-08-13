import { IUserModelEntity } from "../../Entities/ModelEntities/User.Entity";

export interface User {
   _id: string;
   username: string;
   email: string;
   phone: number;
   password: string;
   profile_image?: string
   otp?: number;
   otpCreatedAt?: Date;
   createdAt: Date;
   updatedAt?: Date;
}


export interface userSignupInput {
   username: string,
   email: string,
   phone: number,
   password:string
}




export interface loginInput {
   email: string,
   password: string 
}

export interface UpdateProfile {
   id:string
   username:string
   email:string
   phone:number
}

export interface UpdatePassword {
   _id:string
   email:string
   currentPassword:string
   password:string
}

export interface userOutput {
   success?:boolean,
   message?:string,
   status_code?:number,
   data:IUserModelEntity | IUserModelEntity []
   totalPage?:number
}






