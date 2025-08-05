import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { materialData } from "../../../Input-OutputEntities/PurchaseEntity.ts/Receive";


export interface IApproveReceiveUseCase {
   execute(_id:string,project_id:string,materialDetails:materialData[]):Promise<commonOutput>
}