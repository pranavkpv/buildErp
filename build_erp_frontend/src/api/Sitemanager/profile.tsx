import axioInstance from "../../api/axio";


//change password
export const changePassword = async(_id:string,password:string,changedpassword:string)=>{
    const response = await axioInstance.put(`/site/changepass/${_id}`, { password,changedpassword});
    return response.data
}

//logout sitemanager

export const logoutSitemanager = async()=>{
     const response = await axioInstance.post(`/site/logout`,{},{ withCredentials: true })
     return response.data
}

export const getSitemanagersProject = async(user:string)=>{
    const response = await axioInstance.get(`/site/siteproject/${user}`)
    return response.data
}