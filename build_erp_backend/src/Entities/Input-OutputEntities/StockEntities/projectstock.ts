

export interface addProjectStockInput {
   project: string,
   material_id: string,
   stock: number
}

export interface editprostockData{
     _id:string
   project_id: string,
   material_id: string,
   stock: number,
   createdAt:Date,
   updatedAt:Date
}

export interface editProjectStockData{
   _id:string
   project: string,
   material_id: string,
   stock: number,
   createdAt:Date,
   updatedAt:Date
}