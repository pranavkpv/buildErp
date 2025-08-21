import { publicspecDTO } from "./specification.dto"

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
   spec_id: string;
   spec_name: string;
   unitrate: number;
   quantity: number;
   total: number;
}