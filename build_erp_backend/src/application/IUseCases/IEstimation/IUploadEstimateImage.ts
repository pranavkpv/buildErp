import { commonOutput } from '../../dto/common';
import { imageUploadInput } from '../../Entities/estimation.entity';


export interface IUploadEstimateImageUseCase {
   execute(input: imageUploadInput):
      Promise<commonOutput>
}