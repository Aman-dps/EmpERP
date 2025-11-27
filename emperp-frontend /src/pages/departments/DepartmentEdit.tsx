import { useEffect, useState } from "react";
import {
  getDepartments,
  updateDepartment,
} from "../../api/department.api";
import { Button, TextField, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";

export default function DepartmentEdit() {
  const { id } = useParams();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const load = async () => {
    const res = await axios.get(`/departments/${id}`);
    const d = res.data;
    setName(d.name);
    setCapacity(d.capacity);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    await updateDepartment(Number(id), {
      name,
      capacity: Number(capacity),
    });
    nav("/departments");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <h2>Edit Department</h2>

      <TextField
        fullWidth
        label="Name"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        fullWidth
        label="Capacity"
        margin="normal"
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={save}>
        Update
      </Button>
    </Container>
  );
}
