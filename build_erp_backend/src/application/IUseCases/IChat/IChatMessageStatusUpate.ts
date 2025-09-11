import { IChatModelEntity } from '../../../domain/Entities/modelEntities/chat.entity';

export interface IChatMessageStatusUpateUseCase {
   execute(id:string):Promise<IChatModelEntity | null>
}