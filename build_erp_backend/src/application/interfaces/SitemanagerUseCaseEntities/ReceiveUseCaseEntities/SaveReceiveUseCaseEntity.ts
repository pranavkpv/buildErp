import { commonOutput } from "../../../dto/common";
import { ReceiveInput } from "../../../entities/receive.entity";


export interface ISaveReceiveUseCaseEntity {
   execute(input:ReceiveInput):Promise<commonOutput>
}