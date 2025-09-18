import { commonOutput } from "../../dto/common";

export interface IGetLastInvoiceUsecase {
   execute(): Promise<commonOutput<number>>
}