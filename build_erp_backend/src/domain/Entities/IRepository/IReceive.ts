import { RecieveOutput } from "../../../application/dto/receive.dto";
import { ReceiveInput } from "../../../application/Entities/receive.entity";
import { IReceiveModelEntity } from "../modelEntities/recieve.entity";

export interface IReceiveRepository {

   createReceive(input: ReceiveInput):
      Promise<boolean>

   getReceivesBySearchAndPage(search: string, page: number):
      Promise<{ data: RecieveOutput[], totalPage: number }>

   updateReceive(input: ReceiveInput):
      Promise<boolean>

   deleteReceiveById(_id: string):
      Promise<boolean>

   getReceiveById(_id: string):
      Promise<IReceiveModelEntity | null>

   approveReceiveById(_id: string):
      Promise<void>

   getAllApprovedReceives():
      Promise<IReceiveModelEntity[]>
      
}