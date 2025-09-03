import { commonOutput } from '../../dto/common';

export interface IDeleteBannerUsecase {
   execute(_id: string): Promise<commonOutput | void>
}