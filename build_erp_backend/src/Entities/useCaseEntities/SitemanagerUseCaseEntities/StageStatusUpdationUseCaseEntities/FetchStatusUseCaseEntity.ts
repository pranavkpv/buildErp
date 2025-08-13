import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { fetchcost } from "../../../../DTO/ProjectEntities/Stage";

export interface IFetchStatusUseCaseEntity {
   execute(input: fetchcost): Promise<commonOutput>
}