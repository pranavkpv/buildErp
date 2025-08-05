import { RecieveInput, RecieveOutput } from "../../Input-OutputEntities/PurchaseEntity.ts/Receive";
import { IReceiveModelEntity } from "../../ModelEntities/Recieve.Entity";

export interface IReceiveRepository {
   saveReceive(input:RecieveInput):Promise<boolean>
   getReceive(search:string,page:number):Promise<RecieveOutput>
   updateReceive(input:RecieveInput):Promise<boolean>
   deleteReceiveById(_id:string):Promise<boolean>
   getReceiveById(_id:string):Promise<IReceiveModelEntity | null>
   approveReceive(_id:string):Promise<void>
}