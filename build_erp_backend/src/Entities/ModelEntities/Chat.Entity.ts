export interface IChatModelEntity {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string
  createdAt: Date
  updatedAt: Date
}
