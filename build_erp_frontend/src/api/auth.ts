import authAxios from "../axios/commonAxios"
import type { loginInterface, loginwithGoogleInterface, signupInterface, statusBaseProjectInterface, verifyOtpInterface } from "ApiInterface/authapi.interface";

// ---------------- User Signup ---------------- //

export const userSignupApi = async (input: signupInterface) => {
   const response = await authAxios.post('/signup', input)
   return response.data

}

// ---------------- user signup Verify OTP ---------------- //

export const verifyOTPAPI = async (input: verifyOtpInterface) => {
   const response = await authAxios.post("/verifyOtp", input);
   return response.data;

};

// ---------------- Resend Otp  ---------------- //

export const resendOTPApi = async (email: string) => {
   const response = await authAxios.post('/resendOtp', { email })
   return response.data
}

// ---------------- User Login ---------------- //

export const userLoginAPI = async (input: loginInterface) => {
   const response = await authAxios.post("/login", input, { withCredentials: true });
   return response.data;
};

// ---------------- Sign In With Google ---------------- //

export const SignInWithGoogle = async (input: loginwithGoogleInterface) => {
   const response = await authAxios.post("/googleLogin", input);
   return response.data;
};
// ---------------- Send OTP ---------------- //

export const SendOTP = async (email: string) => {
   const response = await authAxios.post("/forgotOTP", { email });
   return response.data;
};

// ---------------- verify the otp for forgot password---------------- //

export const verifyForgotApi = async (input: verifyOtpInterface) => {
   const response = await authAxios.post('/verifyForgotOtp', input)
   return response.data
}

// ---------------- Update Password (Forgot Password Flow) ---------------- //

export const updatePasswordAPI = async (input: loginInterface) => {
   const response = await authAxios.put("/updatepassword", input);
   return response.data;
};

// ---------------- Display all project api ---------------- //

export const getAllProjectInUserSideApi = async () => {
   const response = await authAxios.get(`/projectListUser`)
   return response.data
}

// ---------------- Display specification data of the corresponding project---------------- //

export const fetchExistEstimationInUser = async (projectId: string) => {
   const response = await authAxios.get(`/fetchExistEstimation/${ projectId }`)
   return response.data
}

// ---------------- Display stage data of the corresponding project---------------- //

export const getStageInUser = async (projectId: string) => {
   const response = await authAxios.get(`/stageFetch/${ projectId }`);
   return response.data;
};


export const fetchStatusBaseProject = async (
   input: statusBaseProjectInterface
) => {
   const { state, searchItem, selectedArea, page } = input
   const response = await authAxios.get(`/fetchstatusbaseproject/${ state }`, {
      params: { searchItem, selectedArea, page }
   });
   return response.data;
};











