import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeleteEstimationUseCaseEntity {
   execute(_id:string):Promise<commonOutput>
}