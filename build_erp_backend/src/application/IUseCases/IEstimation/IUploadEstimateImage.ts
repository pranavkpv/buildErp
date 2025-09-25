import { commonOutput } from '../../dto/common';
import { imageUploadInput } from '../../entities/estimation.entity';


export interface IUploadEstimateImageUseCase {
   execute(input: imageUploadInput):
      Promise<commonOutput>
}