import { apiClient } from "../lib/axios"
import { type LoginUser, type UserProfile, type UserReq, type UserRes } from "../types/UserTypes"

export const userServices = {
    getUserProfile: async (): Promise<UserProfile> => {
        const response = await apiClient.get<UserProfile>('api/user/profile');
        return response.data;
    },
    
    registerUser: async (userData: UserReq): Promise<UserRes> => {
        const response = await apiClient.post<UserRes>('api/auth/register', userData);
        return response.data;
    },

    loginUser: async (userData: LoginUser): Promise<UserRes> => {
        const response = await apiClient.post<UserRes>('api/auth/login', userData);
        return response.data;
    },

    logOutUser: async (): Promise<boolean> => {
        const response = await apiClient.post<boolean>('api/auth/logout');
        return response.data;
    },
}