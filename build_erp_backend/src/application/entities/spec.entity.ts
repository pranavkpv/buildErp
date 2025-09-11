import { IBrandModelEntity } from '../../domain/Entities/modelEntities/brand.entity';
import { IUnitModelEntity } from '../../domain/Entities/modelEntities/unit.entity';

type materialData = {
   material_id: string;
   quantity: number;
};

type labourData = {
   labour_id: string;
   numberoflabour: number;
};

export interface InputSpecification {
   _id?: string
   specId: string,
   specname: string,
   specUnit: string,
   specDescription: string,
   materialDetails: materialData[],
   labourDetails: labourData[],
   additionalExpensePer: number,
   profitPer: number
}

export interface mixMatAndLabour {
   materialDetails: materialData[]
   labourDetails: labourData[]
}

export interface userSpecMaterial {
   material_name: string
   brand_name: string[]
}

interface labourDatas {
   labour_id: string,
   numberoflabour: number,
   _id: string,
   labour_info: {
      _id: string,
      labour_type: string,
      daily_wage: number
   }
}

interface materialDatas {
   material_id: string,
   quantity: number,
   _id: string,
   material_info: {
      _id: string,
      material_name: string,
      brand: IBrandModelEntity,
      unit: IUnitModelEntity
   }
}

export interface listSpec {
   _id: string,
   spec_id: string,
   spec_name: string,
   spec_unit: string,
   description: string,
   additionalExpense_per: number,
   profit_per: 0,
   createdAt: Date,
   updatedAt: Date,
   materialDetails: materialDatas,
   labourDetails: labourDatas
}



