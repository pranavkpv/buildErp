import userAxios from "../../axios/userAxios"

export const userDashBoardApi = async () => {
   const response = await userAxios.get('/dashboard')
   return response.data
}