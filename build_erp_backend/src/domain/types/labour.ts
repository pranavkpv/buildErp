export interface Labour {
   _id: string,
   labour_type: string,
   daily_wage: number,
   createdAt: Date,
   updatedAt: Date
}

//input of labour add

export interface addLabourInput {
   labour_type: string,
   daily_wage: number
}



//input of delete labour
export interface deleteLabourInput {
   _id: string
}


export interface editLabourInput {
   _id: string,
   labour_type: string,
   daily_wage: number
}



export interface outputLabour {
   success: boolean,
   message: string
}


