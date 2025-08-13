import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeleteProjectUseCaseEntity {
   execute(_id:string): Promise<commonOutput>
}