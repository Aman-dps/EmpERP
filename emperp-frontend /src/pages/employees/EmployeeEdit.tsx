import { useEffect, useState } from "react";
import { updateEmployee } from "../../api/employee.api";
import { getDepartments } from "../../api/department.api";
import axios from "../../api/axios";
import { Button, TextField, Container, MenuItem, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeEdit() {
  const { id } = useParams();
  const nav = useNavigate();

  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    title: "",
    department_id: "",
  });
  const [error, setError] = useState("");

  // load employee data
  const load = async () => {
    const res = await axios.get(`/employees/${id}`);
    const e = res.data;

    setForm({
      employee_id: e.employee_id,
      first_name: e.first_name,
      last_name: e.last_name,
      email: e.email,
      title: e.title,
      department_id: e.department_id,
    });
  };

  const loadDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data);
  };

  useEffect(() => {
    load();
    loadDepartments();
  }, []);

  const save = async () => {
    try {
      await updateEmployee(Number(id), {
        ...form,
        department_id: Number(form.department_id),
      });

      nav("/employees");
    } catch (e: any) {
      if (e.response && e.response.data === "department capacity full") {
        setError("Department capacity is full. Please choose another department.");
      } else {
        setError("Failed to update employee.");
      }
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <h2>Edit Employee</h2>
      {error && <Alert severity="error">{error}</Alert>}

      {Object.keys(form).map((key) =>
        key === "department_id" ? (
          <TextField
            select
            fullWidth
            label="Department"
            margin="normal"
            value={form.department_id}
            onChange={(e) =>
              setForm({ ...form, department_id: e.target.value })
            }
          >
            {departments.map((d: any) => (
              <MenuItem key={d.department_id} value={d.department_id}>
                {d.name}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
            fullWidth
            key={key}
            label={key.replace("_", " ")}
            margin="normal"
            value={form[key as keyof typeof form]}
            disabled={key === "employee_id"}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        )
      )}

      <Button variant="contained" sx={{ mt: 2 }} onClick={save}>
        Update
      </Button>
    </Container>
  );
}
