import type { updatePasswordInterface, updateProfileInterface } from "ApiInterface/userprofile.interface";
import userAxios from "../axios/userAxios";

// ---------------- Update profile ---------------- //

export const UpdateProfileAPI = async (input: updateProfileInterface) => {
   const response = await userAxios.patch(`/updateprofile`, input);
   return response.data;
};

// ---------------- Change Password (With Current Password) ---------------- //

export const UpdatePasswordInCheckCurrentPassword = async (input: updatePasswordInterface) => {
   const response = await userAxios.put(`/changepassword`, input);
   return response.data;
};

// ---------------- Update Profile Image ---------------- //

export const UpdateProfileImageAPI = async (file: File | null) => {
   const response = await userAxios.patch(`/updateprofileImage`, { file }, {
      headers: { "Content-Type": "multipart/form-data" }
   });
   return response.data;
};

// ---------------- Fetch Users project ---------------- //

export const fetchUserProjectAPI = async () => {
   const response = await userAxios.get(`/fetchuserproject`);
   return response.data;
};

//-------------------fetch sitemanager data------------------//

export const fetchSitemanagerApI = async () => {
   const response = await userAxios.get(`/fetchatList`)
   return response.data
}

//-------------------fetch chat list------------------//

export const fetchMessagesApi = async (sitemanagerId: string | null) => {
   const response = await userAxios.get(`chats/${ sitemanagerId }`)
   return response.data
}


// ---------------- Logout ---------------- //
export const userLogout = async () => {
   const response = await userAxios.post("/logout", {}, { withCredentials: true });
   return response.data;
};







