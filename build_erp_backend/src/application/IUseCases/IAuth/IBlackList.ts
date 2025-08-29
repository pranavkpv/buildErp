import { commonOutput } from '../../dto/common';

export interface IBlackListUseCase {
   execute(accessToken:string):Promise<commonOutput>
}