import axioInstance from "../../api/axio";


//sitemanager list needs to add sitemanager to project
export const getSitemanager = async()=>{
   const response = await axioInstance.get(`/admin/addSiteToSiteData`);
   return response.data
}

// project list needs to add sitemanager to project
export const getProject = async()=>{
    const response = await axioInstance.get(`/admin/addSiteToProjectData`);
    return response.data
}



//add sitemanager to project
export const postSitemanagerToProject = async(siteManager_id:string,selectedproject:string[])=>{
   const response = await axioInstance.post(`/admin/addToSite`, {
        siteManager_id,
        selectedproject
      });
      return response.data
}

//delete add sitemanager to project 
type siteMagerData = {
   _id:string,
   sitemanager_id:string
}
export const deleteSitemanagerToProject = async(data:siteMagerData)=>{
    const response = await axioInstance.delete(`/admin/addToSite`, {data});
    return response.data
}

//list of add sitemanager to project

export const listOfsitemanager = async(page:number,search:string)=>{
   const response = await axioInstance.get(`/admin/addToSite`, { params: { page, search } });
   return response.data
}