import { commonOutput } from "../../../dto/CommonEntities/common";
import { materialData } from "../../../dto/PurchaseEntity.ts/Receive";


export interface IApproveReceiveUseCaseEntity {
   execute(_id:string,project_id:string,materialDetails:materialData[]):Promise<commonOutput>
}