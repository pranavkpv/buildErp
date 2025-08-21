import { commonOutput } from "../../../dto/common";


export interface IDeleteTransferUseCaseEntity {
   execute(_id:string):Promise<commonOutput>
}