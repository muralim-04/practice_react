import { apiClient } from "../lib/axios"
import { type Response, type UserReq, type UserRes } from "../types/UserTypes"

export const userServices = {
    getUsers: async (): Promise<Response<UserRes[]>> => {
        const response = await apiClient.get<Response<UserRes[]>>('api/User');
        return response.data;
    },
    
    createUser: async (): Promise<UserReq> => {
        const response = await apiClient.post<UserReq>('api/User');
        return response.data;
    },
}