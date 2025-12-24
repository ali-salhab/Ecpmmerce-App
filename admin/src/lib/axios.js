import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000, // Set a default timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies in requests
});
export default axiosInstance;
