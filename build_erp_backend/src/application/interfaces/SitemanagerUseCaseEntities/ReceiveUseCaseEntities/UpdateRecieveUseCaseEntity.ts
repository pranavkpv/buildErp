
import { commonOutput } from "../../../dto/common";
import { ReceiveInput } from "../../../entities/receive.entity";

export interface IUpdateReceiveUseCaseEntity {
   execute(Input:ReceiveInput):Promise<commonOutput>
}