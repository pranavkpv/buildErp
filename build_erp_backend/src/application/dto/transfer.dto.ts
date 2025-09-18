
type materialData = {
   sl: number
   material_id: string
   material_name: string
   brand_name: string
   unit_name: string
   quantity: number
   unit_rate: number
};

export interface listTransferDTO {
   _id: string
   from_project_id: string
   fromproject_name: string
   to_project_id: string
   toproject_name: string
   transfer_id: string
   description: string
   date: string
   materialDetails: materialData[]
   finalAmount: number
}

export type material = {
   sl: number;
   material_id: string;
   material_name: string;
   brand_name: string;
   unit_name: string;
   quantity: number;
   unit_rate: number;
};



export interface TransferOutput {
   _id: string,
   date: Date,
   fromproject_name: string,
   transfer_id: string,
   materialDetails: material[],
   finalAmount: number
};

export interface projectStockListDTO {
   material_name: string;
   brand_name: string;
   unit_name: string;
   unit_rate: number;
   material_id: string;
   stock: number
}