import { commonOutput } from "../../../dto/common";


export interface IDeleteStageUseCase {
   execute(_id:string):Promise<commonOutput>
}