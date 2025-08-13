import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { TransferOutput } from "../../../../DTO/PurchaseEntity.ts/Transfer";

export interface IGetToProjectUseCaseEntity {
   execute(projectId:string): Promise<TransferOutput | commonOutput>
}