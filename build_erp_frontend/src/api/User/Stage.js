import userAxios from "../../axios/userAxios";
export const stagePayApi = async (stageId, stageAmount) => {
    const response = await userAxios.post('/create-payment-intent', { stageId, stageAmount });
    return response.data;
};
export const payFromWalletApi = async (stageId, stageAmount) => {
    const response = await userAxios.post('/walletPayment', { stageId, stageAmount });
    return response.data;
};
