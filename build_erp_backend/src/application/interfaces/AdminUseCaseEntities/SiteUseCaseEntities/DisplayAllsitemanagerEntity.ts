import { commonOutput } from "../../../dto/common";
import { listSitemanagerDTO } from "../../../dto/sitemanager.dto";
import { listingInput } from "../../../entities/common.entity";

export interface IDisplayAllSitemanagerUseCase {
   execute(input:listingInput): Promise<commonOutput<{data:listSitemanagerDTO[],totalPage:number}> | commonOutput>
}