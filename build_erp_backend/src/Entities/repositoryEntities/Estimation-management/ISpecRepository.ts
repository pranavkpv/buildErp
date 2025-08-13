import { listingInput } from "../../../DTO/CommonEntities/common"
import { InputSpecification } from "../../../DTO/EstimationEntities/specification"
import { ISpecModelEntity } from "../../ModelEntities/Spec.Entity"


export interface ISpecRepositoryEntity {
   fetchSpecList(input: listingInput): Promise<{ result: any[], totalPage: number }>;
   saveSpecData(input: InputSpecification): Promise<void>;
   existSpecname(specname: string): Promise<ISpecModelEntity | null>
   existSpecId(specId: string): Promise<ISpecModelEntity | null>
   DeleteSpec(_id: string): Promise<void>
   fetchSpec(): Promise<ISpecModelEntity[]>
   findSpecByMaterialId(_id: string): Promise<ISpecModelEntity | null>
   findSpecByLabourId(_id: string): Promise<ISpecModelEntity | null>
   UpdateSpec(input: InputSpecification): Promise<void>;
   findSpecInEdit(_id: string, spec_id: string): Promise<ISpecModelEntity | null>
   findSpecInEditByName(_id: string, specname: string): Promise<ISpecModelEntity | null>
}
