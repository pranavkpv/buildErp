import { commonOutput, listingInput } from "../../../DTO/CommonEntities/common";

export interface IDisplayAllBrandUseCaseEntity{
   execute(input : listingInput): Promise<commonOutput>
}