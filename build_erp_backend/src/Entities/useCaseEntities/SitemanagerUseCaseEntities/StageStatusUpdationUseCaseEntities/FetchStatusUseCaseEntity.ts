import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { fetchcost } from "../../../Input-OutputEntities/ProjectEntities/Stage";

export interface IFetchStatusUseCase {
   execute(input: fetchcost): Promise<commonOutput>
}