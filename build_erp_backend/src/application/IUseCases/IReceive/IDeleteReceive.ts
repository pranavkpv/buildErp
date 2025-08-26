import { commonOutput } from "../../dto/common";

export interface IDeleteReceiveUseCase {
   execute(_id: string): Promise<commonOutput>
}