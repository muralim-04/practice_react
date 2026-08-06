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
    let errorMessage = 'An unexpected error occurred.';

    if (error.response?.data) {
      const problem = error.response.data;

      // Case 1: Custom detail message (e.g., "Incorrect password")
      if (problem.detail) {
        errorMessage = problem.detail;
      } 
      // Case 2: ASP.NET Validation errors dictionary (e.g., Email validation failure)
      else if (problem.errors) {
        const firstErrorKey = Object.keys(problem.errors)[0];
        if (firstErrorKey && problem.errors[firstErrorKey].length > 0) {
          errorMessage = problem.errors[firstErrorKey][0]; // Grabs the first validation error string
        }
      } 
      // Fallback to title if available
      else if (problem.title) {
        errorMessage = problem.title;
      }
    } else if (error.request) {
      errorMessage = 'Network Error / Server Unreachable';
    }

    // Rewrite the native Axios error message so TanStack Query's `error.message` receives it directly!
    error.message = errorMessage;

    return Promise.reject(error);
  }
);