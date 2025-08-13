import { IPurchaseModelEntity } from "../../Entities/ModelEntities/Purchase.Entity"


export interface purchaseModel extends IPurchaseModelEntity {
   finalAmount?: number
   project_name?: string
}
interface materialData {
   material_id: string;
   quantity: number;
   unit_rate: number;
};
export interface purchaseOutput {
   success?: boolean
   message?: string
   status_code?: number
   data: purchaseModel | purchaseDataOutput[] | purchaseModel[]
   totalPage?: number
}

//----------------------input ---------------------- //

export interface purchaseInput {
   _id?: string
   project_id: string,
   invoice_number: string,
   date: string,
   description: string,
   materialDetails: materialData[]
}


export interface purchaseDataOutput {
   _id: string,
   project_id: string,
   project_name: string,
   invoice_number: string,
   date: Date,
   description: string,
   materialDetails:materialData[],
   finalAmount:number
}