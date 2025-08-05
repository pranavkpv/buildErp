import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteReceiveUsecase {
   execute(_id: string): Promise<commonOutput>
}