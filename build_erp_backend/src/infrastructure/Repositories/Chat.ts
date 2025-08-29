import { chatDB } from '../../api/models/ChatModel';
import { fetchingChatInput, savingChatInput } from '../../application/Entities/chat.entity';
import { IChatModelEntity } from '../../domain/Entities/modelEntities/chat.entity';
import { IChatRepository } from '../../domain/Entities/IRepository/IChat';

export class ChatRepository implements IChatRepository {
  
    // Get all chat messages between two users (sender & receiver)
    async getChatsBetweenUsers(input: fetchingChatInput): Promise<IChatModelEntity[]> {
        const { senderId, receiverId } = input;
        return await chatDB.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        });
    }

    // Create a new chat message
    async createChat(input: savingChatInput): Promise<IChatModelEntity> {
        const { senderId, receiverId, message } = input;
        const newChat = new chatDB({
            senderId,
            receiverId,
            message,
        });

        return await newChat.save();
    }
}
