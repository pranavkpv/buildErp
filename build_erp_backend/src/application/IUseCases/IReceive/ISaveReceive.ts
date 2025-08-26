import { commonOutput } from "../../dto/common";
import { ReceiveInput } from "../../Entities/receive.entity";


export interface ISaveReceiveUseCase {
   execute(input:ReceiveInput):Promise<commonOutput>
}