export interface Unit{
   _id:string,
   unit_name: string,
   short_name: string,
   createdAt:Date,
   updatedAt:Date
}

//input of add unit
export interface addUnitInput {
   unit_name: string,
   short_name: string
}



//input of edit unit

export interface editUnitInput {
   _id: string,
   unit_name: string,
   short_name: string
}



//delete Unit input
export interface deletUnitInput {
   _id: string
}

export interface outputUnit{
   success:boolean,
   message:string
}


