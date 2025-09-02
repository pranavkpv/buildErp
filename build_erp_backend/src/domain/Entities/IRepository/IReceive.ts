import { RecieveOutput } from '../../../application/dto/receive.dto';
import { ReceiveInput } from '../../../application/Entities/receive.entity';
import { IReceiveModelEntity } from '../modelEntities/recieve.entity';

export interface IReceiveRepository {

   createReceive(input: ReceiveInput):
      Promise<boolean>

   getReceivesBySearchAndPage(search: string, page: number):
      Promise<{ data: RecieveOutput[], totalPage: number }>

   updateReceive(input: ReceiveInput):
      Promise<boolean>

   deleteReceiveById(id: string):
      Promise<boolean>

   getReceiveById(id: string):
      Promise<IReceiveModelEntity | null>

   approveReceiveById(id: string):
      Promise<void>

   getAllApprovedReceives():
      Promise<IReceiveModelEntity[]>

   getUnApprovedReceiveByProjectid(id: string):
      Promise<IReceiveModelEntity[]>

}