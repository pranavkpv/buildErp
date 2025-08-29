import { fetchingChatInput, savingChatInput } from '../../../application/Entities/chat.entity';
import { IChatModelEntity } from '../modelEntities/chat.entity';

export interface IChatRepository {

   getChatsBetweenUsers(input: fetchingChatInput):
      Promise<IChatModelEntity[]>

   createChat(input: savingChatInput):
      Promise<IChatModelEntity>
}