import api from "./axios";

export const loginApi = async (username: string, password: string) => {
  const res = await api.post("/api/v1/auth/login", { username, password });
  return res.data;
};

export const registerApi = async (username: string, password: string) => {
  const res = await api.post("/api/v1/auth/register", { username, password });
  return res.data;
};
