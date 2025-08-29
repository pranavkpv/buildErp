import { commonOutput } from '../../dto/common';


export interface ISaveBrandUseCase {
   execute(brandName: string):
      Promise<commonOutput>
}