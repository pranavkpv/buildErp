import { chatDB } from "../../Database/Model/ChatModel";
import { messageData } from "../../DTO/Chat.Entities/Chatlist.Entity";
import { IChatModelEntity } from "../../Entities/ModelEntities/Chat.Entity";
import { IChatRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IChatRepository";

/**
 * Repository class for handling chat-related database operations.
 */
export class ChatRepository implements IChatRepositoryEntity {

  /**
   * Finds chat messages between two users (sender and receiver).
   * 
   * @param input - Object containing `senderId` and `receiverId`.
   * @returns An array of chat messages between the two users.
   */
  async findChatBysenderAndReceiverId(
    input: messageData
  ): Promise<messageData[]> {
    const { senderId, receiverId } = input;
    console.log(input)

    return await chatDB.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId } // reverse order
      ]
    });
  }

  /**
   * Saves a new chat message to the database.
   * 
   * @param input - Chat message details including sender, receiver, and message text.
   * @returns The saved chat document.
   */
  async saveChatData(input: messageData): Promise<IChatModelEntity> {
    const { senderId, receiverId, message } = input;

    const newChat = new chatDB({
      senderId,
      receiverId,
      message
    });

    return await newChat.save();
  }
}
