export interface labourSumInput {
   labour_id: string
   numberoflabour: number
}

export interface labourAddInput {
   labour_type: string,
   daily_wage: number
}

export interface labourEditInput extends labourAddInput {
   _id: string
}