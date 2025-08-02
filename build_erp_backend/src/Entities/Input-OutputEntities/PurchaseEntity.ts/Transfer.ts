import { ITransferModelEntity } from "../../ModelEntities/Transfer.Entity"

export interface transferModel extends ITransferModelEntity {
   _id:string
   finalAmount : number
   fromproject_name:string
   toproject_name:string
}
export interface projectData {
   _id:string
   project_name:string
}
export interface TransferOutput {
   success?: boolean
   message?: string
   status_code?: number
   data: transferModel | transferModel[] | projectData[]
   totalPage?: number
}


//----------------------input ---------------------- //

interface materialData{
   material_id: string;
   quantity: number;
   unit_rate: number;
};

export interface transferInput {
   _id?:string
   from_project_id:string,
   to_project_id:string
   transfer_id:string,
   date:string,
   description:string,
   materialDetails:materialData[]
}