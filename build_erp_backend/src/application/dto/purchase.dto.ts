type materialData = {
   sl: number
   material_id: string
   material_name: string
   brand_name: string
   unit_name: string
   quantity: number
   unit_rate: number
};

export type PurchaseDTO = {
   _id: string
   project_id: string;
   project_name: string;
   invoice_number: string;
   date: string;
   description: string;
   materialDetails: materialData[];
   finalAmount: number;
};