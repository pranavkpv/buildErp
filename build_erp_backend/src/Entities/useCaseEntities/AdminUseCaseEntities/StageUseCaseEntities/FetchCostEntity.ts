import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { fetchcost } from "../../../../DTO/ProjectEntities/Stage";

export interface IFetchCostUseCaseEntity {
   execute(input: fetchcost): Promise<commonOutput>
}