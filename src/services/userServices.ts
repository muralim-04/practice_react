import { apiClient } from "../lib/axios"
import { type LoginUser, type UserReq, type UserRes } from "../types/UserTypes"

export const userServices = {
    getUsers: async (): Promise<UserRes[]> => {
        const response = await apiClient.get<UserRes[]>('api/User/getAllusers');
        return response.data;
    },
    
    registerUser: async (userData: UserReq): Promise<UserRes> => {
        const response = await apiClient.post<UserRes>('api/user/register', userData);
        return response.data;
    },

    loginUser: async (userData: LoginUser): Promise<UserRes> => {
        const response = await apiClient.post<UserRes>('api/user/signin', userData);
        return response.data;
    },
}