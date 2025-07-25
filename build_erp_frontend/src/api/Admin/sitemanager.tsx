import axioInstance from "../../api/axio";

//add sitemanager
export const postSitemanager = async(username:string,email:string)=>{
   const response = await axioInstance.post(`/admin/sitemanager`, {
        username,
        email
      });
      return response.data
}


export const deleteSitemanagerData = async(_id:string)=>{
   const response = await axioInstance.delete(`/admin/sitemanager/${_id}`);
   return response.data
}


//edit sitemanager data

export const editSitemanagerData = async(_id:string, username:string, email:string)=>{
    const response = await axioInstance.put(`/admin/sitemanager/${_id}`, {
        username,
        email
      });
      return response.data
}

//sitemanager list

export const fetchSitemanager = async(page:number,search:string)=>{
   const response = await axioInstance.get(`/admin/sitemanager`,{ params: { page, search } });
   return response.data
}