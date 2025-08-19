import { commonOutput } from "../../../dto/common";


export interface IUploadEstimateImageUseCase {
   execute(url: string, _id: string): Promise<commonOutput>
}