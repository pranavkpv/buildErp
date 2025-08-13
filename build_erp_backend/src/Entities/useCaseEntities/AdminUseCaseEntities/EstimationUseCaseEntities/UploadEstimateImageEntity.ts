import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IUploadEstimateImageUseCaseEntity {
   execute(url: string, _id: string): Promise<commonOutput>
}