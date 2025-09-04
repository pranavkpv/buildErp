export interface chatDataDTO {
   _id: string;
   message: string;
   senderId: string;
   receiverId: string;
   messageStatus:string;
   createdAt: Date;
}