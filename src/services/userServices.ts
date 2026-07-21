import { apiClient } from "../lib/axios"
import { type UserReq, type UserRes } from "../types/UserTypes"

export const userServices = {
    getUsers: async (): Promise<UserRes[]> => {
        const response = await apiClient.get<UserRes[]>('api/User/getAllusers');
        return response.data;
    },
    
    createUser: async (userData: UserReq): Promise<UserRes> => {
        const response = await apiClient.post<UserRes>('api/User/createUser', userData);
        return response.data;
    },

    deleteUser: async (id: number): Promise<void> => {
        await apiClient.delete(`api/User/deleteUser/${id}`);
    },
}