import { commonOutput } from "../../dto/common";

export interface IGetLastTransferIdUseCase {
   execute(): Promise<commonOutput<number> | commonOutput>
}