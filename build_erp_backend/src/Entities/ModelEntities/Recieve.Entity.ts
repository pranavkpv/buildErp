type materialData = {
   material_id: string;
   quantity: number;
   unit_rate: number;
};
export interface IReceiveModelEntity {
   _id?:string
   project_id: string,
   date: Date,
   description: string,
   materialDetails: materialData[],
   approval_status: boolean
   transfer_id : string[]
   createdAt: Date
   updatedAt: Date
}