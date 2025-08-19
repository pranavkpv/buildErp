import { toast } from "react-toastify";
import adminAxios from '../axios/AdminAxioInterceptors'


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
   try {
      const response = await adminAxios.get(`/addproject`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Add New Project ---------------- //

export const postProject = async (
   project_name: string,
   user_id: string,
   address: string,
   mobile_number: string,
   email: string,
   area: number,
   description: string,
   latitude: number,
   longitude: number

) => {
   try {
      const response = await adminAxios.post(`/project`, {
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
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Delete Project ---------------- //

export const deleteProjectData = async (_id: string) => {
   try {
      const response = await adminAxios.delete(`/project/${ _id }`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Edit Project ---------------- //

export const putProject = async (
   _id: string,
   project_name: string,
   user_id: string,
   address: string,
   mobile_number: string,
   email: string,
   area: number,
   description: string,
   latitude: number,
   longitude: number
) => {
   try {
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
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Project List with Pagination & Search ---------------- //

export const projectListData = async (page: number, search: string) => {
   try {
      const response = await adminAxios.get(`/project`, {
         params: { page, search },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Change Project Status ---------------- //

export const pustStatusChange = async (_id: string, status: string) => {
   try {
      const response = await adminAxios.put(`/status/${ _id }`, { status });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};


