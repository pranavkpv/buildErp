import adminAxios from '../axios/adminAxios'

export const getSitemanageridandname = async () => {
   const response = await adminAxios.get(`/addSiteToSiteData`);
   return response.data
}