type materialData = {
   material_id: string;
   quantity: number;
};

type labourData = {
   labour_id: string;
   numberoflabour: number;
};

export interface saveSpecInterface {
   specId: string,
   specname: string,
   specUnit: string,
   specDescription: string,
   materialDetails: materialData[],
   labourDetails: labourData[],
   additionalExpensePer: number,
   profitPer: number
}

export interface editSpecInterface extends saveSpecInterface {
   _id:string
}

export interface ApiSpecTable {
  _id: string;
  spec_id: string;
  spec_name: string;
  spec_unit: string;
  description: string;
  materialDetails: (materialData & {
    material_info: {
      material_name: string;
      brand: { brand_name: string };
      unit: { unit_name: string };
    };
  })[];
  labourDetails: (labourData & {
    labour_info: { labour_type: string };
  })[];
  additionalExpense_per: number;
  profit_per: number;
}
