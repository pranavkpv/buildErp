import { commonOutput, listingInput } from "../../dto/CommonEntities/common";

export interface IDisplayAllBrandUseCaseEntity{
   execute(input : listingInput): Promise<commonOutput>
}