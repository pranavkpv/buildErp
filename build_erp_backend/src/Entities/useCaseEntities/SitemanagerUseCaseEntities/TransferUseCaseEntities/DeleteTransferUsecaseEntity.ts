import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeleteTransferUseCaseEntity {
   execute(_id:string):Promise<commonOutput>
}