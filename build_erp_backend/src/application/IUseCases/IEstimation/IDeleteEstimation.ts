import { commonOutput } from "../../dto/common";


export interface IDeleteEstimationUseCase {
   execute(_id:string):Promise<commonOutput>
}