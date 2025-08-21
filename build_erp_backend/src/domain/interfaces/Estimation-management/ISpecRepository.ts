import { aggregateUnitSpecDTO } from "../../../application/dto/specification.dto";
import { listingInput } from "../../../application/entities/common.entity";
import { InputSpecification } from "../../../application/entities/spec.entity";
import { ISpecModelEntity } from "../../Entities/modelEntities/spec.entity"


export interface ISpecRepository {
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
   editSpecFetch(_id: string): Promise<aggregateUnitSpecDTO[] | null>
}
