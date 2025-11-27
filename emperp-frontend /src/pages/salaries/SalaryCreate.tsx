import { useState } from "react";
import { createSalary } from "../../api/salary.api";
import { Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SalaryCreate() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    employee_id: "",
    payment_date: "",
    amount: "",
    description: "",
  });

  const save = async () => {
    try {
      await createSalary({
        employee_id: form.employee_id, // Send as string
        payment_date: form.payment_date, // Send YYYY-MM-DD string directly
        amount: Number(form.amount),
        description: form.description,
      });

      nav("/salaries");
    } catch (e: any) {
      console.error(e);
      const msg = e.response?.data || "Failed to create salary";
      alert(typeof msg === 'string' ? msg : JSON.stringify(msg));
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <h2>Add Salary</h2>

      <TextField
        fullWidth
        label="Employee ID"
        margin="normal"
        value={form.employee_id}
        onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
      />

      <TextField
        fullWidth
        type="date"
        margin="normal"
        value={form.payment_date}
        onChange={(e) => setForm({ ...form, payment_date: e.target.value })}
      />

      <TextField
        fullWidth
        label="Amount"
        margin="normal"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <TextField
        fullWidth
        label="Description"
        margin="normal"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={save}>
        Save
      </Button>
    </Container>
  );
}
