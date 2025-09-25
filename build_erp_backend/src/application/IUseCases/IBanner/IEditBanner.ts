import { commonOutput } from '../../dto/common';
import { editBannerInput } from '../../entities/banner.entity';

export interface IEditBannerUseCase {
   execute(input: editBannerInput): Promise<commonOutput | void>
}