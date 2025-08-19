import { commonOutput } from "../../../dto/CommonEntities/common";
import { fetchcost } from "../../../dto/ProjectEntities/Stage";

export interface IFetchCostUseCaseEntity {
   execute(input: fetchcost): Promise<commonOutput>
}