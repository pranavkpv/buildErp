interface MaterialData {
   material_name: string;
   brand_name: string;
}

export interface saveRequirementInput {
   materialDetails: MaterialData[]
   spec_id: string[]
   projectId:string
}