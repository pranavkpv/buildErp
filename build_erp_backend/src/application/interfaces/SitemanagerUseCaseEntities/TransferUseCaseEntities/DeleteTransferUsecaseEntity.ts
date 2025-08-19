import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IDeleteTransferUseCaseEntity {
   execute(_id:string):Promise<commonOutput>
}