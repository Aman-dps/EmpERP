import api from "./axios";

export const getSalaries = () => api.get("/api/v1/salaries");
export const getSalaryById = (id: string) => api.get(`/api/v1/salaries/${id}`);
export const createSalary = (data: any) => api.post("/api/v1/salaries", data);
export const updateSalary = (id: string, data: any) =>
    api.patch(`/api/v1/salaries/${id}`, data);
export const deleteSalary = (id: number) =>
    api.delete(`/api/v1/salaries/${id}`);
