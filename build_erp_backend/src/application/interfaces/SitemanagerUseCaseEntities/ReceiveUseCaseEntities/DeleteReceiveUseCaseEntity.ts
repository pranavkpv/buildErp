import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IDeleteReceiveUsecaseEntity {
   execute(_id: string): Promise<commonOutput>
}