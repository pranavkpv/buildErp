type materialData = {
   material_id: string,
   quantity: string,
   unit_rate: string,
}

export interface purchaseInput {
   _id?:string
   project_id: string,
   invoice_number: string,
   date: Date,
   description: string,
   materialDetails:materialData[]
}