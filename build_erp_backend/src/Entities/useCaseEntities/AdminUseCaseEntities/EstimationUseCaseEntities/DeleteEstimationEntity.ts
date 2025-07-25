import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteEstimationUseCase{
   execute(_id:string):Promise<commonOutput>
}