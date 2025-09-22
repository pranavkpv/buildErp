export interface INotificationModelEntity {
   _id: string
   date: Date,
   description: string
   userId: string
   read: boolean
   url: string
   createdAt: Date
   updatedAt: Date
}