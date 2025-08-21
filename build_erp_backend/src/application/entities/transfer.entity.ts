type materials = {
   material_id: string;
   quantity: number;
   unit_rate: number;
};

export interface transferInput {
   _id:string
   from_project_id: string,
   to_project_id: string,
   transfer_id: string,
   date: string,
   description: string,
   materialDetails: materials[]
}