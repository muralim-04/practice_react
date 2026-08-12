import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import type { ProblemDetails } from '../types/ProblemDetails';
import { useUserStore } from "../stores/userStore";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:44321',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const user = useUserStore.getState().user;
    const token = user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ProblemDetails>) => {
    let errorTitle = 'An unexpected error occurred.';
    let errorDetail = 'Something happened.';

    if (error.response?.data) {
      const problem = error.response.data;
      console.error(problem);
      
      if (problem.title){
        errorTitle = problem.title;
      }

      if(problem.detail) {
        if (problem.detail.length > 150) {
          console.error('[Backend Stack Trace]:', problem.detail);
          errorDetail = 'Server Error (Check Console)';
        } else {
          errorDetail = problem.detail;
        }
      }

      if(problem.errors) {
        const firstErrorKey = Object.keys(problem.errors)[0];
        if (firstErrorKey && problem.errors[firstErrorKey].length > 0) {
          errorDetail = problem.errors[firstErrorKey][0]; // Grabs the first validation error string
        }
      }
    } else if (error.request) {
      errorTitle = 'Network Error / Server Unreachable';
    }

    toast.error(errorTitle);
    error.message = errorDetail;

    return Promise.reject(error);
  }
);