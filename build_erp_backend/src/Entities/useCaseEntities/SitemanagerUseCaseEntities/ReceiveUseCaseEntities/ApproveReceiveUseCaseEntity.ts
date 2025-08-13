import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { materialData } from "../../../../DTO/PurchaseEntity.ts/Receive";


export interface IApproveReceiveUseCaseEntity {
   execute(_id:string,project_id:string,materialDetails:materialData[]):Promise<commonOutput>
}