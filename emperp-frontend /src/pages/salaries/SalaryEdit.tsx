import { useEffect, useState } from "react";
import { getSalaryById, updateSalary } from "../../api/salary.api";
import { Button, TextField, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function SalaryEdit() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    employee_id: "",
    payment_date: "",
    amount: "",
    description: "",
  });

  const load = async () => {
    if (!id) return;
    try {
      const res = await getSalaryById(id);
      const s = res.data;
      setForm({
        employee_id: s.employee_id,
        payment_date: new Date(s.payment_date).toISOString().split("T")[0],
        amount: s.amount,
        description: s.description,
      });
    } catch (e) {
      console.error(e);
      alert("Failed to load salary");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!id) return;
    try {
      await updateSalary(id, {
        ...form,
        employee_id: form.employee_id, // Send as string
        amount: Number(form.amount),
        payment_date: form.payment_date, // Send YYYY-MM-DD string directly
      });

      nav("/salaries");
    } catch (e: any) {
      console.error(e);
      const msg = e.response?.data || "Failed to update salary";
      alert(typeof msg === 'string' ? msg : JSON.stringify(msg));
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <h2>Edit Salary</h2>

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
        Update
      </Button>
    </Container>
  );
}
