

type addRowData = {
  project: string;
  stock: number;
};
export interface sumOfMaterialInterface {
   material_id: string
   quantity: number
}

export interface saveMaterialInterface {
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   projectWiseStock: addRowData[]
}

export interface editMaterialInterface  extends saveMaterialInterface {
   _id:string
}