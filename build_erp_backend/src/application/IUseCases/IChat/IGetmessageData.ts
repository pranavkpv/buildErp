import { chatDataDTO } from '../../dto/chat.dto';
import { commonOutput } from '../../dto/common';

export interface IGetMessageDataUseCase {

   execute(userId: string, sitemanagerId: string):
      Promise<commonOutput<chatDataDTO[]> | commonOutput>
      
}