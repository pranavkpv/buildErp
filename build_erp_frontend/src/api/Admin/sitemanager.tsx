import axioInstance from "../../api/axio";

//add sitemanager
export const postSitemanager = async(username:string,email:string)=>{
   const response = await axioInstance.post(`/admin/sitemanager`, {
        username,
        email
      });
      return response.data
}

//delete sitemanager data
type deleteData = {
   _id:string
}
export const deleteSitemanagerData = async(data:deleteData)=>{
   const response = await axioInstance.delete(`/admin/sitemanager`,{ data});
   return response.data
}


//edit sitemanager data

export const editSitemanagerData = async(_id:string, username:string, email:string)=>{
    const response = await axioInstance.put(`/admin/sitemanager`, {
        _id,
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