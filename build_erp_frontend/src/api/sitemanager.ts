import adminAxios from '../axios/AdminAxioInterceptors'

export const getSitemanageridandname = async () => {
   const response = await adminAxios.get(`/addSiteToSiteData`);
   return response.data
}