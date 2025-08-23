import { toast } from "react-toastify";
import adminAxios from '../axios/adminAxios'
import type { addProjectInterface, editProjectInterface } from "ApiInterface/project.interface";


export const getProjectidandname = async () => {
   const response = await adminAxios.get('/getprojectAddSitemanagerProject');
   return response.data;
};

export const getProjectAll = async () => {
   const response = await adminAxios.get("/getAllproject")
   return response.data
}



// ---------------- Fetch Users for Project Assignment ---------------- //

export const fetchUser = async () => {
   const response = await adminAxios.get(`/addproject`);
   return response.data
};

// ---------------- Add New Project ---------------- //

export const postProject = async (
   input: addProjectInterface
) => {
   const response = await adminAxios.post(`/project`, input);
   return response.data;
};

// ---------------- Delete Project ---------------- //

export const deleteProjectData = async (_id: string) => {
   const response = await adminAxios.delete(`/project/${ _id }`);
   return response.data;
};

// ---------------- Edit Project ---------------- //

export const putProject = async (
   input: editProjectInterface
) => {
   const { _id, project_name, user_id, address, mobile_number, email, area, description, latitude, longitude } = input
   const response = await adminAxios.put(`/project/${ _id }`, {
      project_name,
      user_id,
      address,
      mobile_number,
      email,
      area,
      description,
      latitude,
      longitude
   });
   return response.data;
};

// ---------------- Project List with Pagination & Search ---------------- //

export const projectListData = async (page: number, search: string) => {
   const response = await adminAxios.get(`/project`, {
      params: { page, search },
   });
   return response.data;
};

// ---------------- Change Project Status ---------------- //

export const pustStatusChange = async (_id: string, status: string) => {
   const response = await adminAxios.put(`/status/${ _id }`, { status });
   return response.data;
};


