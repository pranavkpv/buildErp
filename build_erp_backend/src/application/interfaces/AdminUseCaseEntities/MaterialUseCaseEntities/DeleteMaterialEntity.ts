import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IDeleteMaterialUseCaseEntity{
   execute(_id:string): Promise<commonOutput>
}