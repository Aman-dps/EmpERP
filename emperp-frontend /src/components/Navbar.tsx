import { AppBar, Toolbar, Button, Box, IconButton, useTheme } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useThemeContext } from "../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Navbar() {
  const { token, logout } = useAuthStore();
  const nav = useNavigate();
  const theme = useTheme();
  const { toggleColorMode } = useThemeContext();
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register", "/auth/callback", "/unauthorized"];

  if (!token || hideNavbarRoutes.includes(location.pathname)) return null;

  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: "background.paper", color: "text.primary" }}>
      <Toolbar sx={{ display: "flex", gap: 3 }}>
        <Button component={Link} to="/" color="inherit">Dashboard</Button>
        <Button component={Link} to="/departments" color="inherit">Departments</Button>
        <Button component={Link} to="/employees" color="inherit">Employees</Button>
        <Button component={Link} to="/salaries" color="inherit">Salaries</Button>
        <Button component={Link} to="/admin/approvals" color="inherit">Approvals</Button>

        <Box flexGrow={1} />

        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Button
          color="error"
          variant="contained"
          sx={{ color: "white", ml: 2 }}
          onClick={() => {
            logout();
            nav("/login");
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
