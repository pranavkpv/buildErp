import { chatDB } from '../../api/models/ChatModel';
import { fetchingChatInput, savingChatInput } from '../../application/entities/chat.entity';
import { IChatModelEntity } from '../../domain/Entities/modelEntities/chat.entity';
import { IChatRepository } from '../../domain/Entities/IRepository/IChat';
import { messageStatusConstant } from '../../Shared/Constants/MessasageStatus.constant';

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
        const { senderId, receiverId, message, messageStatus } = input;
        const newChat = new chatDB({
            senderId,
            receiverId,
            message,
            messageStatus,
        });

        return await newChat.save();
    }
    async updateMessageStatus(id: string): Promise<void> {
        await chatDB.findByIdAndUpdate(id, { messageStatus: messageStatusConstant.DELIVERED });
    }
    async getChatById(id: string): Promise<IChatModelEntity | null> {
        return await chatDB.findById(id);
    }
}
