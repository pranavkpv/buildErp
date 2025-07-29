import { toast } from "react-toastify";
import axioInstance from "../../api/axio";

// --------------- sitemanager list needs to add sitemanager to project --------------- //

export const getSitemanager = async () => {
   try {
      const response = await axioInstance.get(`/admin/addSiteToSiteData`);
      return response.data
   } catch (error: any) {
      toast.error(error.message)
   }
}

// --------------- project list needs to add sitemanager to project --------------- //

export const getProject = async () => {
   try {
      const response = await axioInstance.get(`/admin/addSiteToProjectData`);
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

// --------------- add sitemanager to project --------------- //

export const postSitemanagerToProject = async (siteManager_id: string, selectedproject: string[]) => {
   try {
      const response = await axioInstance.post(`/admin/addToSite`, {
         siteManager_id,
         selectedproject
      });
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

//--------------- Delete sitemanager in particular project --------------- //

export const deleteSitemanagerToProject = async (_id: string, sitemanager_id: string) => {
   try {
      const response = await axioInstance.delete(`/admin/addToSite/${ _id }/${ sitemanager_id }`);
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

// --------------- list of add sitemanager to project --------------- //

export const listOfsitemanager = async (page: number, search: string) => {
   try {
      const response = await axioInstance.get(`/admin/addToSite`, { params: { page, search } });
      return response.data
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
}