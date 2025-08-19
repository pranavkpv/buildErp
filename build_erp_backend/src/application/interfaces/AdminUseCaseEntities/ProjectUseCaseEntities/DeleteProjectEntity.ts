import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IDeleteProjectUseCaseEntity {
   execute(_id:string): Promise<commonOutput>
}