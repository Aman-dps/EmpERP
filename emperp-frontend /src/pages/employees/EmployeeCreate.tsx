import { useEffect, useState } from "react";
import { createEmployee } from "../../api/employee.api";
import { getDepartments } from "../../api/department.api";
import { Button, TextField, Container, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EmployeeCreate() {
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

  const loadDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const save = async () => {
    await createEmployee({
      employee_id: form.employee_id,
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      title: form.title,
      department_id: Number(form.department_id),
    });

    nav("/employees");
  };

  return (
    <Container sx={{ mt: 3 }}>
      <h2>Add Employee</h2>

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
              <MenuItem value={d.department_id}>
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
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        )
      )}

      <Button variant="contained" sx={{ mt: 2 }} onClick={save}>
        Save
      </Button>
    </Container>
  );
}
