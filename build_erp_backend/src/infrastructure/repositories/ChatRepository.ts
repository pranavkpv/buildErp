import { chatDB } from "../../api/models/ChatModel";
import { fetchingChatInput, savingChatInput } from "../../application/entities/chat.entity";
import { IChatModelEntity } from "../../domain/Entities/modelEntities/chat.entity";
import { IChatRepository } from "../../domain/interfaces/Project-management/IChatRepository";

export class ChatRepository implements IChatRepository {
  async findChatBysenderAndReceiverId(
    input: fetchingChatInput
  ): Promise<IChatModelEntity[]> {
    const { senderId, receiverId } = input;

    return await chatDB.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId } 
      ]
    });
  }

  async saveChatData(input: savingChatInput): Promise<IChatModelEntity> {
    const { senderId, receiverId, message } = input;

    const newChat = new chatDB({
      senderId,
      receiverId,
      message
    });

    return await newChat.save();
  }
}
