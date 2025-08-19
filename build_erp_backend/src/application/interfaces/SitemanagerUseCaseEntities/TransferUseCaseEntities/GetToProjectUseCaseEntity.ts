import { commonOutput } from "../../../dto/CommonEntities/common";
import { TransferOutput } from "../../../dto/PurchaseEntity.ts/Transfer";

export interface IGetToProjectUseCaseEntity {
   execute(projectId:string): Promise<TransferOutput | commonOutput>
}