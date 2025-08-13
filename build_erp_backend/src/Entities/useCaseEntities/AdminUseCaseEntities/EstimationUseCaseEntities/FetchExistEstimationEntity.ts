import { commonOutput } from "../../../../DTO/CommonEntities/common";
import {  estimationOutput } from "../../../../DTO/EstimationEntities/estimation";

export interface IFetchExistEstimationUseCaseEntity {
   execute(_id: string): Promise<estimationOutput | commonOutput>
}