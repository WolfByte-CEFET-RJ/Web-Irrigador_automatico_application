import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const createAxiosInstance = () => {
  const { resetToken } = useAuth();

  const api = axios.create({
    baseURL: "http://192.168.1.2:5000",
    headers: {
        'x-reset-token':`${resetToken}`,
    },
  });
  return api;
};

export { createAxiosInstance };