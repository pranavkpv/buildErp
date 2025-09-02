import { chatDataDTO } from '../../application/dto/chat.dto';
import { IChatModelEntity } from '../Entities/modelEntities/chat.entity';


export interface IChatMapper {
   toUserBaseChatMessage(chat:IChatModelEntity[]):chatDataDTO[]
}