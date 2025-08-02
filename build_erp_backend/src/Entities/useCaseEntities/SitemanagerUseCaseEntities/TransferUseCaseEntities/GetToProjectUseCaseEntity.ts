import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { TransferOutput } from "../../../Input-OutputEntities/PurchaseEntity.ts/Transfer";

export interface IGetToProjectUseCase {
   execute(projectId:string): Promise<TransferOutput | commonOutput>
}