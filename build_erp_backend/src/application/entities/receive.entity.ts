type materialDataReceive = {
   material_id: string;
   quantity: number;
   unit_rate: number;
};


export interface ReceiveInput {
   _id?:string
   project_id: string, 
   date: string, 
   description: string, 
   materialDetails: materialDataReceive[], 
   transferId: string[]
}