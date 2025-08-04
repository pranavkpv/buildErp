import { RecieveInput, RecieveOutput } from "../../Input-OutputEntities/PurchaseEntity.ts/Receive";

export interface IReceiveRepository {
   saveReceive(input:RecieveInput):Promise<boolean>
   getReceive(search:string,page:number):Promise<RecieveOutput>
}