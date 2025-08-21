type materialData = {
   material_id: string;
   quantity: number;
};

type labourData = {
   labour_id: string;
   numberoflabour: number;
};

export interface InputSpecification {
   _id?:string
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
   materialDetails:materialData[]
   labourDetails:labourData[]
}



