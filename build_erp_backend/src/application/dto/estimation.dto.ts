import { publicspecDTO } from './specification.dto';

export interface publicEstimationDTO {
   project_id: string
   spec_id: string
   specDetails: publicspecDTO
}

type project = {
   project_name: string;
   expected_image: string;
};

export interface listEstimationDTO {
   project_id: string;
   projectObjectId: string;
   budgeted_cost: number;
   projectDetails: project;
}

export interface specListInProjectDTO {
   _id: string
   spec_id: string;
   spec_name: string;
   unitrate: number;
   quantity: number;
   total: number;
}

export interface estimateByProjectDTO {
   _id: string
   spec_name: string
   quantity: number
   unit_rate: number
   approvalStatus:boolean
}

export interface materialEstimateDTO {
   _id: string
   material_name: string,
   brand_name: string,
   unit_name: string,
   quantity: number,
   unit_rate: number,
}

export interface labourEstimateDTO {
   _id: string
   labour_name: string
   numberoflabour: number
   daily_wage: number
}

export interface additionEstimateDTO {
   additionalExpense_per: number
   additionalExpense_amount: number
   profit_per: number
   profit_amount: number
}