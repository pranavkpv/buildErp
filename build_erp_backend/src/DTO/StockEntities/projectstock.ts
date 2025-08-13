

export interface addProjectStockInput {
   project_id: string,
   material_id: string,
   stock: number
}

export interface editprojectstockInput {
   _id: string
   project_id: string,
   material_id: string,
   stock: number,
}

export interface incrementStockInput {
   material_id:string,
   project_id:string,
   quantity?:number
}

export interface editProjectStockData {
   _id: string
   project: string,
   material_id: string,
   stock: number,
   createdAt: Date,
   updatedAt: Date
}