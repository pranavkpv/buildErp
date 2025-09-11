import { commonOutput } from '../../dto/common';

export interface IDeleteBannerUsecase {
   execute(id: string): Promise<commonOutput | void>
}