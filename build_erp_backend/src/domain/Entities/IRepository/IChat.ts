import { fetchingChatInput, savingChatInput } from '../../../application/entities/chat.entity';
import { IChatModelEntity } from '../modelEntities/chat.entity';

export interface IChatRepository {

   getChatsBetweenUsers(input: fetchingChatInput):
      Promise<IChatModelEntity[]>

   createChat(input: savingChatInput):
      Promise<IChatModelEntity>

   updateMessageStatus(id: string):
      Promise<void>

   getChatById(id: string):
      Promise<IChatModelEntity | null>
}