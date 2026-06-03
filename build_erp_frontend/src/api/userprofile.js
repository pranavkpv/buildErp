import userAxios from "../axios/userAxios";
// ---------------- Update profile ---------------- //
export const UpdateProfileAPI = async (input) => {
    const response = await userAxios.patch(`/updateprofile`, input);
    return response.data;
};
// ---------------- Change Password (With Current Password) ---------------- //
export const UpdatePasswordInCheckCurrentPassword = async (input) => {
    const response = await userAxios.put(`/changepassword`, input);
    return response.data;
};
// ---------------- Update Profile Image ---------------- //
export const UpdateProfileImageAPI = async (file) => {
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
    const response = await userAxios.get(`/fetchatList`);
    return response.data;
};
//-------------------fetch chat list------------------//
export const fetchMessagesApi = async (sitemanagerId) => {
    const response = await userAxios.get(`/chats/${sitemanagerId}`);
    return response.data;
};
// ---------------- Logout ---------------- //
export const userLogout = async () => {
    const response = await userAxios.post("/logout", {}, { withCredentials: true });
    return response.data;
};
export const editEmailApi = async (email) => {
    const response = await userAxios.post('/editEmail', { email });
    return response.data;
};
export const resendForUpadteEmailApi = async () => {
    const response = await userAxios.post('/editEmailresend');
    return response.data;
};
export const verifyEditEmailOTP = async (otp) => {
    const response = await userAxios.post('/editEmailVerify', { otp });
    return response.data;
};
