import axios, { AxiosError } from 'axios';
import type { ProblemDetails } from '../types/ProblemDetails';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:44321',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ProblemDetails>) => {
    if (error.response) {
      const problem = error.response.data;
      console.log(problem.detail, problem.title);
    } else {
      console.error('Network Error / Server Unreachable');
    }
    return Promise.reject(error);
  }
);