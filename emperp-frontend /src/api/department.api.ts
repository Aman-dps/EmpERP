import api from "./axios";

export const getDepartments = () => api.get("/api/v1/departments");
export const createDepartment = (data: any) => api.post("/api/v1/departments", data);
export const updateDepartment = (id: number, data: any) =>
  api.patch(`/api/v1/departments/${id}`, data);
export const deleteDepartment = (id: number) =>
  api.delete(`/api/v1/departments/${id}`);
