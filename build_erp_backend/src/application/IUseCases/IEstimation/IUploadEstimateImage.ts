import { commonOutput } from '../../dto/common';


export interface IUploadEstimateImageUseCase {
   execute(url: string, id: string):
      Promise<commonOutput>
}