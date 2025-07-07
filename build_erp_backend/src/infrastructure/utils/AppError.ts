import { generalError } from "../../domain/types/generalError";


export class AppError implements generalError{
   public success: boolean;
   public message: string;
   public statusCode:number;
   constructor(success:boolean,message:string,statusCode:number){
      this.success = success
      this.message = message
      this.statusCode = statusCode
   }
}