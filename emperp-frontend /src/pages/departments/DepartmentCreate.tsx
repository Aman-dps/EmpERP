import { useState } from "react";
import { createDepartment } from "../../api/department.api";
import { Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DepartmentCreate() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const save = async () => {
    await createDepartment({
      name,
      capacity: Number(capacity),
    });

    nav("/departments");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <h2>Create Department</h2>

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
        Save
      </Button>
    </Container>
  );
}
