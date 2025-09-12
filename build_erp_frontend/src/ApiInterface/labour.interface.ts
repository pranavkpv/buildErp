export interface sumofLabourInterface {
   labour_id: string
   numberoflabour: number
}

export interface addLabourInterface {
   labour_type: string,
   daily_wage: number
}

export interface editLabourInterface extends addLabourInterface {
   _id: string
}

export interface labourData {
   _id: string;
   labour_type: string;
   daily_wage: number;
};