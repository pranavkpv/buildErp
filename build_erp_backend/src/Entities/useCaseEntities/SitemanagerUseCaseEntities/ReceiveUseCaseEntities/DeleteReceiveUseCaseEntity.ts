import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeleteReceiveUsecaseEntity {
   execute(_id: string): Promise<commonOutput>
}