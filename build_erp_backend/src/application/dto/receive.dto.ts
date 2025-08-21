type materialData = {
   sl: number
   material_id: string
   material_name: string
   brand_name: string
   unit_name: string
   quantity: number
   unit_rate: number
};
type transferData = {
   _id:string
   transfer_id:string
   from_project_id:string
   from_project_name:string
   date:string
   materialDetails:materialData[]
}

export interface RecieveOutput  {
   _id: string
   project_id: string;
   Toproject_name: string;
   description: string;
   date: string;
   transferDetails:transferData[]
   materialData: materialData[];
   finalAmount: number;
};