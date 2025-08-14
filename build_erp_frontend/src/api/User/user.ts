import { toast } from "react-toastify";
import userAxios from "../../axios/UserAxioInterceptors";
import authAxios from "../../axios/authAxios"

// ---------------- User Login ---------------- //

export const userLoginAPI = async (email: string, password: string) => {
   try {
      const response = await authAxios.post("/login", { email, password }, { withCredentials: true });
      return response.data;
   } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
   }
};

// ---------------- Send OTP ---------------- //

export const SendOTP = async (email: string) => {
   try {
      const response = await authAxios.post("/forgotOTP", { email });
      return response.data;
   } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
   }
};

// ---------------- Verify OTP ---------------- //

export const verifyOTPAPI = async (otp: string, email: string) => {
   try {
      const response = await authAxios.post("/verifyOtp", { otp, email });
      return response.data;
   } catch (error: any) {
      toast.error(error.response?.data?.message || "OTP verification failed");
   }
};

// ---------------- Update Password (Forgot Password Flow) ---------------- //

export const updatePasswordAPI = async (otpEmail: string | null, password: string) => {
   try {
      const response = await authAxios.put("/updatepassword", { email: otpEmail, password });
      return response.data;
   } catch (error: any) {
      toast.error(error.response?.data?.message || "Password update failed");
   }
};

// ---------------- Logout ---------------- //

export const userLogout = async () => {
   try {
      console.log("helloooo")
      const response = await userAxios.post("/logout", {}, { withCredentials: true });
      return response.data;
   } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
   }
};

// ---------------- Update Profile ---------------- //

export const UpdateProfileAPI = async (_id: string, username: string, email: string, phone: number) => {
   try {
      const response = await userAxios.patch(`/updateprofile/${ _id }`, { username, email, phone });
      return response.data;
   } catch (error: any) {
      toast.error(error.response?.data?.message || "Profile update failed");
   }
};

// ---------------- Update Profile Image ---------------- //

export const UpdateProfileImageAPI = async (file: File | null, _id: string) => {
   try {
      const response = await userAxios.patch(`/updateprofileImage/${ _id }`, { file }, {
         headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response?.data?.message || "Profile image update failed");
   }
};

// ---------------- Sign In With Google ---------------- //

export const SignInWithGoogle = async (email: string, username: string, profile_image: string) => {
   try {
      const response = await authAxios.post("/googleLogin", { email, username, profile_image });
      return response.data;
   } catch (error: any) {
      toast.error(error.response?.data?.message || "Google sign-in failed");
   }
};

// ---------------- Change Password (With Current Password) ---------------- //

export const UpdatePasswordInCheckCurrentPassword = async (
   _id: string,
   email: string,
   currentPassword: string,
   password: string
) => {
   try {
      const response = await userAxios.put(`/changepassword/${ _id }`, {
         email,
         currentPassword,
         password
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response?.data?.message || "Password change failed");
   }
};


export const userSignupApi = async (username: string, email: string, phone: string, password: string) => {
   try {
      const response = await authAxios.post('/signup', { username, email, phone, password })
      return response.data
   } catch (error: any) {
      toast.error(error.response?.data?.message);
   }
}

export const resendOTPApi = async (email: string) => {
   try {
      const response = await authAxios.post('/resendOtp', { email })
      return response.data
   } catch (error: any) {
      toast.error(error.response?.data?.message);
   }
}

export const verifyForgotApi = async (otp:string,email:string) => {
   try {
      const response = await authAxios.post('/verifyForgotOtp', { otp,email })
      return response.data
   } catch (error:any) {
       toast.error(error.response?.data?.message)
   }
}
