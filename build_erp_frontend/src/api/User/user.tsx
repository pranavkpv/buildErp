import axioInstance from "../../api/axio"

export const userLoginAPI = async (email: string, password: string) => {
   const result = await axioInstance.post("/login", { email, password }, { withCredentials: true });
   console.log(result.data)
   return result.data
}

export const SendOTP = async (email: string) => {
   const result = await axioInstance.post("/forgotOTP", { email })
   return result.data
}

export const updatePasswordAPI = async (otpEmail: string | null, password: string) => {
   const result = await axioInstance.put("/updatepassword", { email: otpEmail, password })
   return result.data
}

export const userLogout = async () => {
   const response = await axioInstance.post(`/logout`, {}, { withCredentials: true })
   return response.data
}

export const UpdateProfileAPI = async (_id: string, username: string, email: string, phone: number) => {
   const response = await axioInstance.patch(`/updateprofile/${ _id }`, { username, email, phone })
   return response.data
}

export const UpdateProfileImageAPI = async (file: File | null, _id: string) => {
   const response = await axioInstance.patch(`/updateprofileImage/${ _id }`, { file }, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   })
   return response.data
}


export const verifyOTPAPI = async (otp: string, email: string) => {
   const response = await axioInstance.post('/verifyOtp', { otp, email })
   return response.data
}


export const SignInWithGoogle = async (email: string, username: string, profile_image: string) => {
   const response = await axioInstance.post("/googleLogin", { email, username, profile_image })
   return response.data
}

export const UpdatePasswordInCheckCurrentPassword = async (_id: string,email:string, currentPassword: string, password: string) => {
   const response = await axioInstance.put(`/changepassword/${_id}`, { email,currentPassword, password })
   return response.data
}

