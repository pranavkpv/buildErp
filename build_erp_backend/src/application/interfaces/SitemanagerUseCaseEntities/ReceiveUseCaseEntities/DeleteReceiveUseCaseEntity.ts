import { commonOutput } from "../../../dto/common";


export interface IDeleteReceiveUsecaseEntity {
   execute(_id: string): Promise<commonOutput>
}