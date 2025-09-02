import { IChatModelEntity } from '../../domain/Entities/modelEntities/chat.entity';
import { IChatMapper } from '../../domain/IMappers/IChat.mapper';
import { chatDataDTO } from '../dto/chat.dto';

export class ChatMapper implements IChatMapper {
    toUserBaseChatMessage(chat: IChatModelEntity[]):chatDataDTO[] {
        return chat.map((item) => ({
            _id: item._id,
            senderId: item.senderId,
            receiverId: item.receiverId,
            message: item.message,
            createdAt: item.createdAt,
        }));
    }
}