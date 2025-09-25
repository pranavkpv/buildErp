import { IChatModelEntity } from '../../../domain/Entities/modelEntities/chat.entity';
import { savingChatInput } from '../../entities/chat.entity';

export interface IChatSaveUseCase {
   execute(input: savingChatInput):
      Promise<IChatModelEntity>
}