import { ISpecModelEntity } from '../../domain/Entities/modelEntities/spec.entity';
import { IUnitModelEntity } from '../../domain/Entities/modelEntities/unit.entity';

export interface publicspecDTO {
   spec_name: string
   description: string
}

interface materialDetails {
   material_id: string;
   quantity: number;
}

interface labourDetails {
   labour_id: string;
   numberoflabour: number;
}

export interface specFullDTO {
   _id: string;
   spec_id: string;
   spec_name: string;
   spec_unit: string;
   description: string;
   materialDetails: materialDetails[];
   labourDetails: labourDetails[];
   additionalExpense_per: number;
   profit_per: number;
}

export interface aggregateUnitSpecDTO extends ISpecModelEntity {
    unitDetails :IUnitModelEntity
}