import axioInstance from "../../api/axio";



//add project needs the use data 
export const fetchUser = async () => {
   const response = await axioInstance.get(`/admin/addproject`);
   return response.data
}

//add project

export const postProject = async (project_name: string, user_id: string, address: string,
   mobile_number: string, email: string, area: number, description: string) => {
   const response = await axioInstance.post(`/admin/project`, {
      project_name,
      user_id,
      address,
      mobile_number,
      email,
      area,
      description,
   });
   return response.data
}


export const deleteProjectData = async (_id:string) => {
   const response = await axioInstance.delete(`/admin/project/${_id}`);
   return response.data
}

//edit the project data

export const putProject = async (_id: string, project_name: string, user_id: string, address: string,
   mobile_number: string, email: string, area: number, description: string) => {
   const response = await axioInstance.put(`/admin/project/${_id}`, {
      project_name,
      user_id,
      address,
      mobile_number,
      email,
      area,
      description,
   });
   return response.data
}


//project list

export const projectListData = async (page: number, search: string) => {
   const response = await axioInstance.get(`/admin/project`, { params: { page, search } });
   return response.data
}

//status change

export const pustStatusChange = async (_id: string, status: string) => {
   const response = await axioInstance.put(`/admin/status/${_id}`, { status });
   return response.data
}

//get project
export const getProject = async()=>{
   const response = await axioInstance.get('/admin/getproject')
   return response.data
}