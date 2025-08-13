import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeleteMaterialUseCaseEntity{
   execute(_id:string): Promise<commonOutput>
}