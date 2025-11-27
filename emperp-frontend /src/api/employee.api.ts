import api from "./axios";

export const getEmployees = (department_id?: number) =>
  api.get("/api/v1/employees", { params: { department_id } });

export const getEmployeeById = (empId: string) =>
  api.get(`/api/v1/employees/${empId}`);

export const createEmployee = (data: any) =>
  api.post("/api/v1/employees", data);

export const updateEmployee = (id: number, data: any) =>
  api.patch(`/api/v1/employees/${id}`, data);

export const deleteEmployee = (id: number) =>
  api.delete(`/api/v1/employees/${id}`);

export const uploadPhoto = (id: number, photo: File) => {
  const formData = new FormData();
  formData.append("photo", photo);

  return api.patch(`/api/v1/employees/${id}/photo`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
