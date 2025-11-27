import { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Divider, InputAdornment, IconButton, Alert } from "@mui/material";
import { loginApi } from "../../api/auth.api";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate, Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const setToken = useAuthStore((s) => s.setToken);
  const nav = useNavigate();

  const login = async () => {
    setError("");
    try {
      const res = await loginApi(username, password);
      if (res.token) {
        setToken(res.token);
        nav("/");
      } else {
        setError("Login failed: No token received");
      }
    } catch (e: any) {
      console.error(e);
      setError("Wrong credentials");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: (theme) =>
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #0B0E14 0%, #1A1F35 50%, #2D1B4E 100%)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          width: 400,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            p: 2,
            borderRadius: "50%",
            mb: 2,
            color: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Box>

        <Typography variant="h4" gutterBottom fontWeight="700" color="primary">
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sign in to access your dashboard
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setU(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          fullWidth
          type={showPassword ? "text" : "password"}
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setP(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            mt: 4,
            mb: 2,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
          }}
          onClick={login}
        >
          Login
        </Button>

        <Divider sx={{ width: "100%", my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            borderColor: "#db4437",
            color: "#db4437",
            "&:hover": {
              borderColor: "#c53929",
              bgcolor: "rgba(219, 68, 55, 0.04)",
            },
          }}
        >
          Login with Google
        </Button>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none", fontWeight: "bold", color: "#1976d2" }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
