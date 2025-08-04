import { IReceiveModelEntity } from "../../ModelEntities/Recieve.Entity";

type materialData = {
   material_id: string;
   quantity: number;
   unit_rate: number;
};

export interface RecieveInput {
   project_id: string,
   date: string,
   description: string,
   materialDetails: materialData[],
   transferId: string[]
}
type materialList = {
   material_name: string,
   material_id: string,
   brand_name: string,
   unit_name: string,
   quantity: number,
   unit_rate: number
}
type transferList = {
   _id: string,
   date: string,
   fromproject_name: string,
   transfer_id: string,
   finalAmount: number
}


export interface ReceiveData {
   project_id: string,
   project_name: string,
   date: string,
   finalAmount: number,
   materialData: materialList[]
   transferData: transferList[]
}


export interface RecieveOutput {
   success?: boolean
   message?: string
   status_code?: number
   data: IReceiveModelEntity | IReceiveModelEntity[] | ReceiveData[]
   totalPage?: number
}

