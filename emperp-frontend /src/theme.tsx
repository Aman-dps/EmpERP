import { type ThemeOptions } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "#667eea" : "#5D5FEF", // Electric Purple for Dark
    },
    secondary: {
      main: mode === "light" ? "#764ba2" : "#00D4FF", // Cyan for Dark
    },
    background: {
      default: mode === "light" ? "#f5f6fa" : "#0B0E14", // Deep Space Blue
      paper: mode === "light" ? "#ffffff" : "#151A23", // Dark Card Background
    },
    text: {
      primary: mode === "light" ? "rgba(0, 0, 0, 0.87)" : "#FFFFFF",
      secondary: mode === "light" ? "rgba(0, 0, 0, 0.6)" : "#B0B3C5",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
    },
  },
});


