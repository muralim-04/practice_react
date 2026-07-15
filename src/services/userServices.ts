import { apiClient } from "../lib/axios"
import type { UserReq, UserRes } from "../types/UserTypes"

export const userServices = {
    createUser: async (): Promise<UserReq> => {
        const response = await apiClient.post<UserReq>('/user');
        return response.data;
    },

    getUser: async (): Promise<UserRes> => {
        const response = await apiClient.get<UserRes>('/user');
        return response.data;
    }
}