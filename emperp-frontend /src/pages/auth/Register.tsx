import { useState } from "react";
import { registerApi } from "../../api/auth.api";
import { Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const res = await registerApi(username, password);
      alert("Registration successful!");
      nav("/login");
    } catch (err: any) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <h2>Register</h2>

      <TextField
        label="Username"
        fullWidth
        margin="normal"
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        label="Password"
        fullWidth
        margin="normal"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={register}
      >
        Register
      </Button>

      <Button
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => nav("/login")}
      >
        Already have an account? Login
      </Button>
    </Container>
  );
}
