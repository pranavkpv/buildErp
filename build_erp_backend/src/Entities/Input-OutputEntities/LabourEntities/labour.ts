export interface Labour {
   _id: string,
   labour_type: string,
   daily_wage: number,
   createdAt: Date,
   updatedAt: Date
}


export interface addLabourInput {
   labour_type: string,
   daily_wage: number
}





export interface editLabourInput {
   _id: string,
   labour_type: string,
   daily_wage: number
}



