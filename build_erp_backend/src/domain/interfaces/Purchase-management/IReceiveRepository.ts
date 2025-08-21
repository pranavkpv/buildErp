import { RecieveOutput } from "../../../application/dto/receive.dto";
import { IReceiveModelEntity } from "../../Entities/modelEntities/recieve.entity";

export interface IReceiveRepository {
   saveReceive(input:RecieveInput):Promise<boolean>
   getReceive(search:string,page:number):Promise<{data:RecieveOutput[],totalPage:number}>
   updateReceive(input:RecieveInput):Promise<boolean>
   deleteReceiveById(_id:string):Promise<boolean>
   getReceiveById(_id:string):Promise<IReceiveModelEntity | null>
   approveReceive(_id:string):Promise<void>
   findAllReceive() : Promise<IReceiveModelEntity[]>
}