import { aggregateUnitSpecDTO } from "../../../application/dto/specification.dto";
import { listingInput } from "../../../application/Entities/common.entity";
import { InputSpecification } from "../../../application/Entities/spec.entity";
import { ISpecModelEntity } from "../modelEntities/spec.entity"


export interface ISpecRepository {

   getAllSpecs(input: listingInput):
      Promise<{ result: any[], totalPage: number }>;

   createSpec(input: InputSpecification):
      Promise<void>;

   getSpecByName(specname: string):
      Promise<ISpecModelEntity | null>

   getSpecBySpecId(specId: string):
      Promise<ISpecModelEntity | null>

   getSpecForEdit(_id: string):
      Promise<aggregateUnitSpecDTO[] | null>

   deleteSpecById(_id: string):
      Promise<void>

   getAllSpecsList():
      Promise<ISpecModelEntity[]>

   getSpecByMaterialId(_id: string):
      Promise<ISpecModelEntity | null>

   getSpecByLabourId(_id: string):
      Promise<ISpecModelEntity | null>

   updateSpec(input: InputSpecification):
      Promise<void>;

   getSpecDuplicateById(_id: string, spec_id: string):
      Promise<ISpecModelEntity | null>

   getSpecDuplicateByName(_id: string, specname: string):
      Promise<ISpecModelEntity | null>
}
