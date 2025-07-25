
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







