import { apiClient } from "../lib/axios"
import type { PaginationResult,  PostRes } from "../types/PostTypes";

export const postsServices = {
    createPost: async (post: FormData): Promise<PostRes> => {
        const response = await apiClient.post<PostRes>('api/post/createPost', post);
        return response.data;
    },
    
    getAllPosts: async (pageNumber: number, pageSize: number): Promise<PaginationResult<PostRes>> => {
        const response = await apiClient.get<PaginationResult<PostRes>>(`api/post/getAllPosts?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
    },

    deletePost: async (postId: number): Promise<boolean> => {
        const response = await apiClient.delete<boolean>(`api/post/deletePost/${postId}`);
        return response.data;
    },
    deletePostAdmin: async (postId: number): Promise<boolean> => {
        const response = await apiClient.delete<boolean>(`api/post/deletePostAdmin/${postId}`);
        return response.data;
    },

}