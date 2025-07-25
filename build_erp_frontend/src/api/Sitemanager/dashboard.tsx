import axioInstance from "../../api/axio"

export const SiteManagerLoginAPI = async(email:string,password:string)=>{
   const data =await axioInstance.post("/site/login", { email, password }, {
        withCredentials: true
      });
      return data.data
} 