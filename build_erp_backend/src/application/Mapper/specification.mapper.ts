import { ISpecModelEntity } from "../../domain/Entities/modelEntities/spec.entity";
import { ISpecificationMapper } from "../../domain/mappers/ISpecification.mapper";
import { specFullDTO } from "../dto/specification.dto";

export class SpecificationMapper implements ISpecificationMapper {
   toFetchSitemanagerNameandId(spec: ISpecModelEntity[]): specFullDTO[] {
       return spec.map((item)=>({
         _id:item._id,
         additionalExpense_per:item.additionalExpense_per,
         description:item.description,
         profit_per:item.profit_per,
         spec_id:item.spec_id,
         spec_name:item.spec_name,
         spec_unit:item.spec_name,
         labourDetails:item.labourDetails.map((labour)=>({
          labour_id:labour.labour_id,
          numberoflabour:labour.numberoflabour
         })),
         materialDetails:item.materialDetails.map((material)=>({
          material_id:material.material_id,
          quantity:material.quantity
         }))
       }))
   }
}