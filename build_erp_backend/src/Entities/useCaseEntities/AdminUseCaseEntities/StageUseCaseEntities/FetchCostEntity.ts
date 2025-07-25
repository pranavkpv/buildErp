import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { fetchcost } from "../../../Input-OutputEntities/ProjectEntities/Stage";

export interface IFetchCostUseCase {
   execute(input: fetchcost): Promise<commonOutput>
}