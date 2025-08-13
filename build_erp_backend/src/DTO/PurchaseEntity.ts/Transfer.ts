import { ITransferModelEntity } from "../../Entities/ModelEntities/Transfer.Entity"
import { materialDetails } from "../EstimationEntities/specification"

export interface transferModel extends ITransferModelEntity {
   _id: string
   finalAmount: number
   fromproject_name: string
   toproject_name: string
}
export interface projectData {
   _id: string
   project_name: string
}
interface transferData {
   _id: string
   date: string
   fromproject_name: string
   transfer_id: string
   materialDetails: materialData[]
   finalAmount: number
}
export interface TransferOutput {
   success?: boolean
   message?: string
   status_code?: number
   data: ITransferModelEntity | ITransferModelEntity[] | projectData[] | transferData[] | fetchTransferInput[]
   totalPage?: number
}


//----------------------input ---------------------- //

export interface materialData {
   material_id: string;
   quantity: number;
   unit_rate: number;
};

export interface transferInput {
   _id?: string
   from_project_id: string,
   to_project_id: string
   transfer_id: string,
   date: string,
   description: string,
   materialDetails: materialData[]
}

export interface fetchTransferInput {
   _id: string,
   from_project_id: string,
   fromproject_name: string,
   to_project_id: string,
   toproject_name: string,
   transfer_id: string,
   date: string,
   description: string,
   materialDetails: materialDetails[],
   finalAmount: number
}