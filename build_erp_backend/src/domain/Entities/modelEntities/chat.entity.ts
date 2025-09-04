export interface IChatModelEntity {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
  messageStatus:string;
  createdAt: Date
  updatedAt: Date
}
