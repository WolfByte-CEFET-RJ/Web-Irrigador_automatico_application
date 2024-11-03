import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const createAxiosInstance = () => {
  const { token } = useAuth();

  const api = axios.create({
    baseURL: "http://192.168.0.19:5000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return api;
};

export { createAxiosInstance };
