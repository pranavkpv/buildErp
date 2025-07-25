import axioInstance from "../../api/axio"

export const userLoginAPI = async(email:string,password:string) => {
   const result = await axioInstance.post("/login",{ email, password },{ withCredentials: true });
   console.log(result.data)
   return result.data
}

export const SendOTP = async (email:string)=>{
   const result =await axioInstance.post("/forgotOTP",{email})
   return result.data
}

export const updatePasswordAPI = async (otpEmail:string | null,password:string) =>{
   const result = await axioInstance.put("/updatepassword",{email:otpEmail,password})
   return result.data
}

export const userLogout = async()=>{
    const response = await axioInstance.post(`/logout`,{},{ withCredentials: true })
   return response.data
}