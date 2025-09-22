import authAxios from "../axios/commonAxios"

export const fetchNotificationByUserApi = async () => {
   const response = await authAxios.get('/notification')
   return response.data
}

export const markReadApi = async (Id: string) => {
   const response = await authAxios.patch(`/notification/${ Id }`)
   return response.data
}