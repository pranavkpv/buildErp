import { IPurchaseModelEntity } from "../../ModelEntities/Purchase.Entity"


export interface purchaseModel extends IPurchaseModelEntity {
   _id:string
   finalAmount : number
   project_name:string
}
interface materialData{
   material_id: string;
   quantity: number;
   unit_rate: number;
};
export interface purchaseOutput {
   success?:boolean
   message?:string
   status_code?:number
   data:purchaseModel | purchaseModel[]
   totalPage?:number
}

//----------------------input ---------------------- //

export interface purchaseInput {
   project_id:string,
   invoice_number:string,
   date:string,
   description:string,
   materialDetails:materialData[]
}