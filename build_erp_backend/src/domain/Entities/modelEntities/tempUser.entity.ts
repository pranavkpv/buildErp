export interface ITempUserModelEntity {
   _id:string
   username:string
   email:string
   phone:number
   password:string
   otp?:string
   otpCreatedAt?:string
}